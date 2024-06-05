// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSpot, validateReview, validatePriceQuery, validateLatQuery, validateLngQuery } = require('../../utils/validation');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById, checkExistsAndAuthorized, checkBookingDates } = require('../../utils/tools');
const { getAllReviewsBySpotId, getAllBookingsBySpotId, getAllSpots } = require('../../utils/spotsController');
const { validateAndCreateBooking } = require('../../utils/bookingsController');
const { Op } = require('sequelize');

// GET all spots
router.get('/', validatePriceQuery, validateLatQuery, validateLngQuery, async (req, res) => {
    const { minLng, maxLng } = req.query;
    const longitudeRegex = /^-?\d{1,3}\.\d{6}$/;
    const validateLongitude = (value) => {
      if (!longitudeRegex.test(value)) {
        throw new Error('Longitude is not valid');
      }
    };

    if (minLng) {
      try {
        validateLongitude(minLng);
      } catch (error) {
        return res.status(400).json({ message: 'Bad Request', errors: { minLng: 'Minimum longitude is invalid' } });
      }
    }

    if (maxLng) {
      try {
        validateLongitude(maxLng);
      } catch (error) {
        return res.status(400).json({ message: 'Bad Request', errors: { maxLng: 'Maximum longitude is invalid' } });
      }
    }
        try {
        const Spots = await getAllSpots(req);
        res.json(Spots);
    } catch (error) {
        console.log(error.status);
        console.error(error);
        if (error.errors) {
            res.status(error.status || 400).json({ message: error.message || 'Bad Request', errors: error.errors });
        } else {
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
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
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    try {
        const bookings = await getAllBookingsBySpotId(req, spotId);
        res.json({ Bookings: bookings });
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }
        console.log(error.status);
        console.error(error);
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
    }
});


// POST create a new spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    console.log(req);
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

        const newSpot = Object.assign({}, req.body, { ownerId: id });

        const spot = await Spot.create(newSpot);

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
        await checkExistsAndAuthorized(spotId, user, 'spot', 'edit');
        const spotImage = await SpotImage.create(Object.assign({ spotId: spotId }, req.body));

        res.status(200).json({
            id: spotImage.id,
            url: spotImage.url,
            preview: spotImage.preview
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
});


// POST create a new booking by spot id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const user = req.user.id;
    if (!spotId || isNaN(parseInt(spotId)))  {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
    try {
        checkBookingDates(startDate, endDate);
        const booking = await validateAndCreateBooking(spotId, startDate, endDate, user, req);

        res.status(201).json({
            id: booking.id,
            spotId: parseInt(booking.spotId),
            userId: booking.userId,
            startDate: formatDate(startDate, true),
            endDate: formatDate(endDate, true),
            createdAt: formatDate(booking.createdAt),
            updatedAt: formatDate(booking.updatedAt)
        });
        
    } catch (error) {
        console.error(error);
        const errorResponse = {
            message: error.message,
                errors: error.details
        };
        res.status(error.status || 500).json(errorResponse || { message: 'Internal Server Error' });

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
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
});

// PUT update/edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { spotId } = req.params;
    const user = req.user.id;
    try {
        await checkExistsAndAuthorized(spotId, user, 'spot', 'edit');
        let spot = await Spot.findByPk(spotId);
        Object.assign(spot, req.body);
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
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
});

// DELETE a spot by its id
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const user = req.user.id;
    try {
        await checkExistsAndAuthorized(spotId, user, 'spot', 'delete');
    const spot = await Spot.findByPk(spotId);
    await spot.destroy();
    res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
  });
  
module.exports = router;
