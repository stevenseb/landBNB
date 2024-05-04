
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../db/models');
const { Op } = require('sequelize');


function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return null;
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    return totalStars / reviews.length;
};

function formatDate(dateString, dateOnly) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    if(dateOnly) {
        return `${year}-${month}-${day}`;
    }
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function formatSpots(spots, pagination) {
    // const page = pagination.offset + 1;
    // const size = pagination.limit;
    const formattedSpots = spots.map(spot => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: formatDate(spot.createdAt),
        updatedAt: formatDate(spot.updatedAt),
        avgRating: calculateAverageRating(spot.Reviews),
        previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null
    }));
    // formattedSpots.page = page;
    // formattedSpots.size = size;
    return {
        formattedSpots
    }
};




function formatSpotById(spot, owner) {
    {
        spot = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: formatDate(spot.createdAt),
            updatedAt: formatDate(spot.updatedAt),
            numReviews: spot.Reviews.length,
            avgStarRating: calculateAverageRating(spot.Reviews),
            spotImages: spot.SpotImages,
            owner: owner
        }
        return spot;
    };
};

function formatBookings(bookings) {
    return bookings.map(booking => ({
    id: booking.id,
    spotId: booking.spotId,
    Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: booking.Spot.SpotImages.length > 0 ? booking.Spot.SpotImages[0].url : null
    },
    userId: booking.userId,
    startDate: formatDate(booking.startDate, true),
    endDate: formatDate(booking.endDate, true),
    createdAt: formatDate(booking.createdAt),
    updatedAt: formatDate(booking.updatedAt)
}));
};

function formatBookingById(booking) {
    if (booking.Spot) {
        return {
            id: booking.id,
            spotId: booking.spotId,
            Spot: {
                id: booking.Spot.id,
                ownerId: booking.Spot.ownerId,
                address: booking.Spot.address,
                city: booking.Spot.city,
                state: booking.Spot.state,
                country: booking.Spot.country,
                lat: booking.Spot.lat,
                lng: booking.Spot.lng,
                name: booking.Spot.name,
                price: booking.Spot.price,
                previewImage: booking.Spot.SpotImages.length > 0 ? booking.Spot.SpotImages[0].url : null
            },
            userId: booking.userId,
            startDate: formatDate(booking.startDate, true),
            endDate: formatDate(booking.endDate, true),
            createdAt: formatDate(booking.createdAt),
            updatedAt: formatDate(booking.updatedAt),
        };
    } else {
        return null;
    }
};

async function bookingConflictCheck(req, booking) {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const bookings = await Booking.findAll({
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
return bookings;
};

function checkBookingDates(startDate, endDate) {
    const now = new Date();
    if (new Date(startDate) <= now) {
        throw new Error("startDate must be in the future");
    } else if (new Date(endDate) <= new Date(startDate)) {
        throw new Error("endDate cannot be on or before startDate");
    }
}

    
async function checkExistsAndAuthorized(objId, userId, flag, op) {
    if (flag == 'spot') {
        const spot = await Spot.findByPk(objId);
        if (!spot) {
            const error = new Error("Spot couldn't be found");
            error.status = 404;
            throw error;
        } 
        if (spot.ownerId !== userId) {
            const error = new Error(`You are not authorized to ${op} this spot`);
            error.status = 403;
            throw error;
        }
    }
    else if (flag == 'booking') {
        const booking = await Booking.findByPk(objId);
        if (!booking) {
            const error = new Error("Booking couldn't be found");
            error.status = 404;
            throw error;
        } 
        if (booking.ownerId !== userId) {
            const error = new Error(`You are not authorized to ${op} this booking`);
            error.status = 403;
            throw error;
        }
    }
    else if (flag == 'review') {
        const review = await Review.findByPk(objId);
        if (!review) {
            const error = new Error("Review couldn't be found");
            error.status = 404;
            throw error;
        } 
        if (booking.ownerId !== userId) {
            const error = new Error(`You are not authorized to ${op} this review`);
            error.status = 403;
            throw error;
        }
    }
};

    

module.exports = { 
    formatDate, 
    calculateAverageRating, 
    formatSpots, 
    formatSpotById, 
    formatBookings, 
    formatBookingById,
    bookingConflictCheck,
    checkBookingDates,
    checkExistsAndAuthorized,
};
