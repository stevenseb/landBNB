// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const { user } = req;

    try {
        const reviewImage = await ReviewImage.findByPk(imageId);
        if (!reviewImage) {
            return res.status(404).json({ message: "Review Image couldn't be found" });
        }

        const review = await Review.findByPk(reviewImage.reviewId);
        if (review.userId !== user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this image" });
        }
        await reviewImage.destroy();

        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
