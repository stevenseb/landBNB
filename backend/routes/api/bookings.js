// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById, formatBookings, formatBookingById } = require('../../utils/tools');
const { getAllReviewsBySpotId } = require('../../utils/spotsController');
const { Op } = require('sequelize');

//GET bookings of current user
router.get('/current', requireAuth, async (req, res) => {
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

//DELETE a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    
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

//PUT edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {

    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    try {
   
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking couldn't be found" });
        }
        if (booking.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to edit this booking" });
        }
        const now = new Date();
        if (new Date(startDate) <= now) {
            return res.status(400).json({
                message: "Bad Request",
                errors: {
                    startDate: "startDate must be in the future"
                }
            });
        } else if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({
                message: "Bad Request",
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                }
            });
        }

        const overlappingBookings = await Booking.findAll({
            where: {
                spotId: booking.spotId,
                id: {
                    [Op.ne]: booking.id 
                },
                startDate: {
                    [Op.lt]: new Date(endDate)
                },
                endDate: {
                    [Op.gt]: new Date(startDate)
                }
            }
        });
        if (overlappingBookings.length > 0) {
            return res.status(400).json({
                message: "Bad Request",
                errors: {
                    startDate: "Booking conflicts with existing bookings for this spot"
                }
            });
        }
        await booking.update({
            startDate: startDate,
            endDate: endDate
        });
        const updated = Booking.findByPk(bookingId);

        res.status(200).json({
            id: updated.id,
            spotId: updated.spotId,
            userId: updated.userId,
            startDate: formatDate(updated.startDate, true),
            endDate: formatDate(updated.endDate, true),
            createdAt: formatDate(updated.createdAt),
            updatedAt: formatDate(updated.updatedAt)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
