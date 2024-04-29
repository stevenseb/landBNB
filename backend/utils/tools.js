


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

function formatSpots(spots) {
    return spots.map(spot => ({
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
};



module.exports = { formatDate, calculateAverageRating, formatSpots, formatSpotById, formatBookings, formatBookingById };
