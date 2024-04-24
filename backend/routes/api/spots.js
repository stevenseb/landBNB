// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots } = require('../../utils/tools');


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

router.get('/session', async (req, res) => { 
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



module.exports = router;
