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

module.exports = router;
