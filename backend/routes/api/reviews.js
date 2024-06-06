// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSpot, validateReview } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById } = require('../../utils/tools');
const { getCurrentUserReviews } = require('../../utils/reviewsController');

// get reviews of current user
router.get('/current', requireAuth, async (req, res) => { 
    try {
        const reviews = await getCurrentUserReviews(req);
        res.json({ Reviews: reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST image to a review by review id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
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

 //PUT edit a review by its id
 router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  try {
      let existingReview = await Review.findByPk(reviewId);
      if (!existingReview) {
          return res.status(404).json({ message: "Review couldn't be found" });
      }
      if (existingReview.userId !== userId) {
          return res.status(403).json({ message: "You are not authorized to edit this review" });
      }

      existingReview.review = review;
      existingReview.stars = stars;
      existingReview.updatedAt = new Date();
      existingReview = await existingReview.save();

      res.status(200).json({
          id: existingReview.id,
          userId: existingReview.userId,
          spotId: existingReview.spotId,
          review: existingReview.review,
          stars: existingReview.stars,
          createdAt: formatDate(existingReview.createdAt),
          updatedAt:formatDate(existingReview.updatedAt)
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE a review by its id
router.delete('/:reviewId', requireAuth, async (req, res) => { 
    const { reviewId } = req.params;
    const user = req.user.id;
    try {
      const review = await Review.findByPk(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
      }
      if (review.userId !== user) {
        return res.status(403).json({ message: "You are not authorized to delete this review" });
      }

      await review.destroy();
  
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;
