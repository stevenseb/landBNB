const { requireAuth } = require('./auth');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById, formatBookings, formatBookingById, checkBookingDates, bookingConflictCheck } = require('./tools');
const { Op } = require('sequelize');


// GET bookings of current user
async function getCurrentBookings(user) {
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
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            order: ['id']
        });
        return formatBookings(bookings);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch bookings');
    }
}
async function validateAndUpdateBooking(bookingId, startDate, endDate, userId) {
    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            const error = new Error("Booking couldn't be found");
            error.status = 404;
            throw error;
        }
        if (booking.userId !== userId) {
            const error = new Error("You are not authorized to edit this booking");
            error.status = 403;
            throw error;
        }
        const overlappingBookings = await bookingConflictCheck(req, booking);
        
        if (overlappingBookings.length > 0) {
            const error = new Error("Sorry, this spot is already booked for the specified dates");
            error.status = 403;
            error.errors = {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            };
            throw error;
        }
        
        return booking;
    } catch (error) {
        throw error;
    }
}


//POST create a new booking from spot id
async function validateAndCreateBooking(spotId, startDate, endDate, userId, req) {
    try {

        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        }
        if (spot && spot.ownerId === userId) {
            const error = new Error("You are the owner of this spot, booking not allowed.");
            error.status = 403;
            throw error;
        }

        const overlappingBookings = await bookingConflictCheck(req, spotId);
        
        if (overlappingBookings.length > 0) {
            const error = new Error("Sorry, this spot is already booked for the specified dates");
            error.status = 403;
            error.details = {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            };
            throw error;
        }

        const booking = await Booking.create({
            spotId: spotId,
            userId: userId,
            startDate: startDate,
            endDate: endDate
        });

        return booking;
    } catch (error) {
        throw error;
    }
}
        



module.exports = { 
    getCurrentBookings, 
    validateAndUpdateBooking, 
    validateAndCreateBooking 
};
