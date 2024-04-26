// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById } = require('../../utils/tools');
const { getCurrentUserReviews } = require('../../utils/reviewsController');

// get reviews of current user
router.get('/current', async (req, res) => { 
    try {
        const reviews = await getCurrentUserReviews(req);
        res.json({ Reviews: reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 



module.exports = router;
