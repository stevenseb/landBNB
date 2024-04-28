// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');


router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const { user } = req;

    try {
        const spotImage = await SpotImage.findByPk(imageId);
        if (!spotImage) {
            return res.status(404).json({ message: "Spot Image couldn't be found" });
        }

        const spot = await Spot.findByPk(spotImage.spotId);
        if (spot.ownerId !== user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this image" });
        }

        await spotImage.destroy();

        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
