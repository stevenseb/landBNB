// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById, formatBookings } = require('../../utils/tools');
const { getAllReviewsBySpotId } = require('../../utils/spotsController');


// get bookings of current user
router.get('/current', async (req, res) => {
    requireAuth;
    const { user } = req;

    try {
        const bookings = await Booking.findAll({
            where: { userId: user.id },
            include: [
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: User,
                            attributes: []
                        },
                        {
                            model: SpotImage,
                            attributes: ['url'],
                            where: { preview: true },
                            required: false
                        }
                    ]
                },
            ],
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
        });
        const formatted = formatBookings(bookings);

        
        res.json({ Bookings: formatted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:bookingId', async (req, res) => {
    requireAuth;
    const { bookingId } = req.params;
    const userId = req.user.id;

    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking couldn't be found" });
        }

        if (booking.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this booking" });
        }

        const now = new Date();
        if (new Date(booking.startDate) <= now) {
            return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
        }
        await booking.destroy();

        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
