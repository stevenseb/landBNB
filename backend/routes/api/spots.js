// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSpot, validateReview } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById } = require('../../utils/tools');
const { getAllReviewsBySpotId, getAllBookingsBySpotId } = require('../../utils/spotsController');
const { Op } = require('sequelize');

// GET all spots
router.get('/', async (req, res) => {        
    try {
        const spots = await Spot.findAll({
            include: [
                {
                    model: Review,
                    attributes: ['stars']
                },
                {
                    model: SpotImage,
                    where: { preview: true },
                    attributes: ['url']
                }
            ],
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
            order: ['id'],
        });

        const response = await formatSpots(spots);
        
        res.json({ Spots: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// GET spots of current user
router.get('/current', requireAuth, async (req, res) => { 
    const { user } = req;
    try {
        const spots = await Spot.findAll({
            where: { ownerId: user.id },

            include: [
                {
                    model: Review,
                    attributes: ['stars']
                },
                {
                    model: SpotImage,
                    where: { preview: true },
                    attributes: ['url']
                }
            ],
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
            order: ['id'],
        });

        const response = await formatSpots(spots);
        
        res.json({ Spots: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// GET spot by id
router.get('/:id', async (req, res) => { 
    const id = req.params.id;
    try {
        const spot = await Spot.findByPk(id, {
            include: [
                {
                    model: Review,
                    attributes: ['stars']
                },
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview'],
                },
            ],
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
            order: [[SpotImage, 'id', 'ASC']],
        });
        
        const owner = await User.findByPk(spot.ownerId, {
            attributes: ['id', 'firstName', 'lastName'],
        });
        const response = await formatSpotById(spot, owner);
        
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Spot Couldn't be found" });
    }
});

//GET reviews for a spot by spot id
router.get('/:spotId/reviews', async (req, res) => { 
    try {
        const reviews = await getAllReviewsBySpotId(req);
        res.json({ Reviews: reviews });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}); 

//GET all bookings by spot id
router.get('/:spotId/bookings', async (req, res) => { 
    const { spotId } = req.params;
    try {
        const bookings = await getAllBookingsBySpotId(req, spotId);
        res.json({ Bookings: bookings });
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// POST create a new spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const id = req.user.id;
    try {
        const existingSpot = await Spot.findOne({
            where: {
                address: address,
                city: city,
                state: state,
                country: country
            }
        });

        if (existingSpot) {
            return res.status(400).json({ message: "Spot with the same address already exists" });
        }

        const spot = await Spot.create({
            ownerId: id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        });

        res.status(201).json({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: formatDate(spot.createdAt),
            updatedAt: formatDate(spot.updatedAt)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST an image by spot id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;
    const user = req.user.id;
  
    try {
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
      if (spot.ownerId !== user) {
        return res.status(403).json({ message: "You are not authorized to edit this spot" });
      }

      const spotImage = await SpotImage.create({
        spotId: spotId,
        url: url,
        preview: preview
      });
  
      res.status(200).json({
        id: spotImage.id,
        url: spotImage.url,
        preview: spotImage.preview
      });
    } catch (error) {
      console.error('Error adding spot image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// POST create a new booking by spot id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const user = req.user.id;

    try {
        const now = new Date();
        if (new Date(startDate) <= now) {
            return res.status(400).json({
                message: "Bad Request",
                errors: {
                    startDate: "startDate must be in the future"
                }
            });
        } else if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({
                message: "Bad Request",
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                }
            });
        }
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }
        if (spot.ownerId === user) {
            return res.status(403).json({ message: "You are the owner of this spot, booking not allowed." });
        }
        const overlappingBookings = await Booking.findAll({
            where: {
                spotId: spotId,
                startDate: {
                    [Op.lt]: new Date(endDate)
                },
                endDate: {
                    [Op.gt]: new Date(startDate)
                }
            }
        });
        if (overlappingBookings.length > 0) {
            return res.status(400).json({
                message: "Bad Request",
                errors: {
                    startDate: "Booking conflicts with existing bookings for this spot"
                }
            });
        }
        const booking = await Booking.create({
            spotId: spotId,
            userId: user,
            startDate: startDate,
            endDate: endDate
        });

        res.status(201).json({
            id: booking.id,
            spotId: parseInt(booking.spotId),
            userId: booking.userId,
            startDate: formatDate(booking.startDate, true),
            endDate: formatDate(booking.endDate, true),
            createdAt: formatDate(booking.createdAt),
            updatedAt: formatDate(booking.updatedAt)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST create a new review by spot id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    try {
        let spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }
        const existingReview = await Review.findOne({
            where: {
                userId: userId,
                spotId: spotId
            }
        });

        if (existingReview) {
            return res.status(500).json({ message: "User already has a review for this spot" });
        }

        const createdReview = await Review.create({
            userId: userId,
            spotId: spotId,
            review: review,
            stars: stars
        });

        res.status(201).json({
            id: createdReview.id,
            userId: createdReview.userId,
            spotId: parseInt(createdReview.spotId),
            review: createdReview.review,
            stars: createdReview.stars,
            createdAt: formatDate(createdReview.createdAt),
            updatedAt: formatDate(createdReview.updatedAt)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT update/edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { spotId } = req.params;
    const user = req.user.id;

    try {
        let spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }
        if (spot.ownerId !== user) {
            return res.status(403).json({ message: "You are not authorized to edit this spot" });
          }
        for (const key in req.body) {
            if (Object.hasOwnProperty.call(req.body, key)) {
                spot[key] = req.body[key];
            }
        }

        spot = await spot.save();

        res.status(200).json({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: formatDate(spot.createdAt),
            updatedAt: formatDate(spot.updatedAt)            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE a spot by its id
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const user = req.user.id;
    try {
      const spot = await Spot.findByPk(spotId);
  
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
      if (spot.ownerId !== user) {
        return res.status(403).json({ message: "You are not authorized to delete this spot" });
      }

      await spot.destroy();
  
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      console.error('Error deleting spot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;

module.exports = router;
