// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById, formatBookings, formatBookingById, checkExistsAndAuthorized, checkBookingDates } = require('../../utils/tools');
const { getCurrentBookings, validateAndUpdateBooking } = require('../../utils/bookingsController');
const { Op } = require('sequelize');

//GET bookings of current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    try {
        const formattedBookings = await getCurrentBookings(user);
        res.json({ Bookings: formattedBookings });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
});

//DELETE a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const userId = req.user.id;
    if (!bookingId || isNaN(parseInt(bookingId)))  {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }
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
        res.json({ message: "Successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
});

//PUT edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;
    if (!bookingId || isNaN(parseInt(bookingId)))  {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }
    try {
        checkBookingDates(startDate, endDate);
        const booking = await validateAndUpdateBooking(bookingId, startDate, endDate, userId, req);
            
        await booking.update({
            startDate: startDate,
            endDate: endDate
        });

        const updatedBooking = await Booking.findByPk(bookingId, {
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
        });

        // Adjust response dates to handle the issue with one day earlier
        // const responseStartDate = new Date(updatedBooking.startDate);
        // const responseEndDate = new Date(updatedBooking.endDate);
        // responseStartDate.setDate(responseStartDate.getDate() + 1);
        // responseEndDate.setDate(responseEndDate.getDate() + 1); 

        res.json({
            id: updatedBooking.id,
            spotId: updatedBooking.spotId,
            userId: updatedBooking.userId,
            startDate: formatDate(startDate, true),
            endDate: formatDate(endDate, true),
            createdAt: formatDate(updatedBooking.createdAt),
            updatedAt: formatDate(updatedBooking.updatedAt)
        });
        const errorResponse = {
            message: error.message,
                errors: error.details
        };
    } catch (error) {
        console.error(error);
        const errorResponse = {
            message: error.message,
                errors: error.details
        };
        res.status(error.status || 500).json(errorResponse || { message: 'Internal Server Error' });

    }
});




module.exports = router;
