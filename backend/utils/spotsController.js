const { requireAuth } = require('./auth');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../db/models');
const { formatDate } = require('./tools');


// Query for get all reviews by spot id
async function getAllReviewsBySpotId(req, res) {
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      const error = new Error("Spot couldn't be found");
      error.status = 404;
      throw error;
    }

    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: ReviewImage, attributes: ['id', 'url'] }
      ]
    });

    // response formatting
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: formatDate(review.createdAt),
      updatedAt: formatDate(review.updatedAt),
      User: {
        id: review.User.id,
        firstName: review.User.firstName,
        lastName: review.User.lastName
      },
      ReviewImages: review.ReviewImages.map(image => ({
        id: image.id,
        url: image.url
      }))
    }));
    return formattedReviews;
    
  } catch (error) {
    throw error;
  }
};

// Query for all bookings by spot id
async function getAllBookingsBySpotId(req, spotId) {
  try {
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
          const error = new Error("Spot couldn't be found");
          error.status = 404;
          throw error;
      }
      
      let bookings;
      if (req.user.id === spot.ownerId) {
          // If the user is the owner of the spot, retrieve all bookings
          bookings = await Booking.findAll({
              where: { spotId: spotId },
              include: [
                  {
                      model: User,
                      attributes: ['id', 'firstName', 'lastName'],
                  },
              ],
              attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
          });
      } else {
          // If the user is not the owner, retrieve only their bookings for the spot
          bookings = await Booking.findAll({
              where: { spotId: spotId, userId: req.user.id },
              attributes: ['id', 'spotId', 'startDate', 'endDate'],
          });
      }

      // Format the response
      const formattedBookings = bookings.map(booking => {
          if (req.user.id === spot.ownerId) {
              return {
                  User: {
                      id: booking.User.id,
                      firstName: booking.User.firstName,
                      lastName: booking.User.lastName
                  },
                  id: booking.id,
                  spotId: booking.spotId,
                  userId: booking.userId,
                  startDate: formatDate(booking.startDate, true),
                  endDate: formatDate(booking.endDate, true),
                  createdAt: formatDate(booking.createdAt),
                  updatedAt: formatDate(booking.updatedAt)
              };
          } else {
              return {
                  spotId: booking.spotId,
                  startDate: formatDate(booking.startDate, true),
                  endDate: formatDate(booking.endDate, true)
              };
          }
      });

      return formattedBookings;
  } catch (error) {
      throw new Error('Error fetching bookings: ' + error.message);
  }
}







module.exports = {
  getAllReviewsBySpotId,
  getAllBookingsBySpotId
};
