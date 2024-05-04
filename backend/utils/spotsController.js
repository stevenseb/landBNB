const { requireAuth } = require('./auth');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../db/models');
const { formatDate, formatSpots } = require('./tools');
const { validationResult, check } = require('express-validator');
const { validatePriceQuery } = require('./validation');
const { Op } = require('sequelize');


//GET query for get all spots
async function getAllSpots(req) {
  let { page, size } = req.query;
    page = parseInt(page);
    size = parseInt(size);

    if (page === undefined || page === null || isNaN(page)) {
        page = 1;
    }
    if (size === undefined || size === null || isNaN(size)) {
        size = 20;
    }

    const pagination = {
        limit: size,
        offset: size * (page - 1)
    };

    // Define where object for query filtering
    const { minPrice, maxPrice, minLat, maxLat, minLng, maxLng } = req.query;
    const where = {};
    // create price search parameter in where obj
    if (minPrice !== undefined || maxPrice !== undefined) {
        if (minPrice !== undefined) {
            where.price = { [Op.gte]: parseFloat(minPrice) };
        }
        if (maxPrice !== undefined) {
            where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
        }
    }
    // create lat search parameter in where obj
    if (minLat !== undefined || maxLat !== undefined) {
      if (minLat !== undefined) {
        where.lat = { [Op.gte]: parseFloat(minLat) };
    }
      if (maxLat !== undefined) {
          where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
      }
    }
    // create lng search parameter in where obj
    if (minLng !== undefined || maxLng !== undefined) {
      if (minLng !== undefined) {
        where.lng = { [Op.gte]: parseFloat(minLng) };
    }
    if (maxLng !== undefined) {
        where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
    }
  }
  try {
    if (page == 0 || page < 1) {
      const error = new Error("Bad Request");
      error.status = 400;
      error.message = "Bad Request";
      error.errors = {
        "page": "Page must be greater than or equal to 1"
      };
      throw error;
    }
    if (size < 1 || size > 20) {
      const error = new Error("Bad Request");
      error.status = 400;
      error.message = "Bad Request";
      error.errors = {
        "size": "Size must be between 1 and 20"
      };
      throw error;
    }
      const spots = await Spot.findAll({
          include: [
              {
                  model: Review,
                  attributes: ['stars']
              },
              {
                  model: SpotImage,
                  where: { preview: true },
                  attributes: ['url']
              }
          ],
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
          order: ['id'],
          where,
          ...pagination
      });

      const Spots = formatSpots(spots);
      
      return {
        Spots,
        page,
        size
      }

  } catch (error) {
      throw error;
  }
}

//GET query for get all reviews by spot id
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
          bookings = await Booking.findAll({
              where: { spotId: spotId, userId: req.user.id },
              attributes: ['id', 'spotId', 'startDate', 'endDate'],
          });
      }
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
      throw error;
  }
}







module.exports = {
  getAllReviewsBySpotId,
  getAllBookingsBySpotId,
  getAllSpots
};
