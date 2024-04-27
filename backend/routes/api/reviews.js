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

// POST image to a review by review id
router.post('/:reviewId/images', async (req, res) => {
    requireAuth; 
    const { reviewId } = req.params;
    const { url } = req.body;
    const user = req.user.id;
  
    try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
      }
      if (review.userId !== user) {
        return res.status(403).json({ message: "You are not authorized to edit this review" });
      }
      const imageCount = await ReviewImage.count({ where: { reviewId: reviewId } });
      if (imageCount >= 10) {
        return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
    }
      const reviewImage = await ReviewImage.create({
        reviewId: reviewId,
        url: url
      });
      res.status(200).json({
        id: reviewImage.id,
        url: reviewImage.url
      });
    } catch (error) {
      console.error('Error adding review image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 



module.exports = router;
