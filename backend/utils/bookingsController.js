const { requireAuth } = require('./auth');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../db/models');
const { formatDate, calculateAverageRating, formatSpots, formatSpotById, formatBookings, formatBookingById, checkBookingDates } = require('./tools');
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
// Update booking helper function
async function validateAndUpdateBooking(bookingId, startDate, endDate, userId) {
    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            throw new Error("Booking couldn't be found");
        }
        if (booking.userId !== userId) {
            throw new Error("You are not authorized to edit this booking");
        }
        const now = new Date();
        if (new Date(startDate) <= now) {
            throw new Error("startDate must be in the future");
        } else if (new Date(endDate) <= new Date(startDate)) {
            throw new Error("endDate cannot be on or before startDate");
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
            throw new Error("Sorry, this spot is already booked for the specified dates.");
        }
        
        return booking;
    } catch (error) {
        throw error;
    }
}

//POST create a new booking from spot id
async function validateAndCreateBooking(spotId, startDate, endDate, userId) {
    try {
         //await checkBookingDates(startDate, endDate);
        
        const spot = await Spot.findByPk(spotId);
         if (!spot) {
            throw new Error("Spot couldn't be found");
         }
        if (spot.ownerId === userId) {
             throw new Error("You are the owner of this spot, booking not allowed.");
         }
        
         const overlappingBookings = await Booking.findAll({
               where: {
                  spotId: spotId,
                  startDate: {
                       [Op.lt]: new Date(endDate)
                    },
                    endDate: {
                        [Op.gt]: new Date(startDate)
                    }
                }
            });
         if (overlappingBookings.length > 0) {
              throw new Error("Sorry, this spot is already booked for the specified dates.");
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
