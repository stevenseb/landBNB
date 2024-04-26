const { requireAuth } = require('./auth');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../db/models');
const { formatDate } = require('./tools');


// function to get reviews of current user
async function getCurrentUserReviews(req) {
    requireAuth;
    const { user } = req;
    try {
        const reviews = await Review.findAll({
            where: { userId: user.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                    include: [
                        {
                            model: SpotImage,
                            where: { preview: true },
                            attributes: ['id', 'url']
                        }
                    ]
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ],
            attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        });

        const formattedReviews = reviews.map(review => {
            const formattedSpot = {
                id: review.Spot.id,
                ownerId: review.Spot.ownerId,
                address: review.Spot.address,
                city: review.Spot.city,
                state: review.Spot.state,
                country: review.Spot.country,
                lat: review.Spot.lat,
                lng: review.Spot.lng,
                name: review.Spot.name,
                price: review.Spot.price,
                previewImage: review.Spot.SpotImages.length > 0 ? review.Spot.SpotImages[0].url : null // Assuming only one preview image per spot
            };
            return {
                id: review.id,
                userId: review.userId,
                spotId: review.spotId,
                review: review.review,
                stars: review.stars,
                createdAt: formatDate(review.createdAt),
                updatedAt: formatDate(review.updatedAt),
                User: review.User,
                Spot: formattedSpot,
                ReviewImages: review.ReviewImages
            };
        });

        return formattedReviews;
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
}


module.exports = { getCurrentUserReviews };
