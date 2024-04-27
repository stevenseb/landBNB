// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById } = require('../../utils/tools');
const { getAllReviewsBySpotId } = require('../../utils/spotsController');


// GET ALL SPOTS
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
        });

        const response = await formatSpots(spots);
        
        res.json({ Spots: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// get spots of current user
router.get('/current', async (req, res) => { 
    requireAuth; 
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

// POST an image by spot id
router.post('/:spotId/images', async (req, res) => {
    requireAuth; 
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



// DELETE a spot by its id
router.delete('/:spotId', async (req, res) => {
    requireAuth; 
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
