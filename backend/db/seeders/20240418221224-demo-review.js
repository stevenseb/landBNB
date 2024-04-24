'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Reviews';
options.validate = true;

const demoReviews = [
  {
    "userId": 1,
    "spotId": 1,
    "review": "This was an awesome spot!",
    "stars": 5,
  },
  {
    "userId": 2,
    "spotId": 4,
    "review": "We really enjoyed the view and our stay!",
    "stars": 4,
  },
  {
    "userId": 3,
    "spotId": 2,
    "review": "Highly recommended for families!",
    "stars": 4,
  },
  {
    "userId": 5,
    "spotId": 2,
    "review": "Unfortunately our stay did not meet expectations.",
    "stars": 3,
  },
  {
    "userId": 4,
    "spotId": 1,
    "review": "Thanks for the wonderful stay!",
    "stars": 4,
  },
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Review.bulkCreate(demoReviews, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
