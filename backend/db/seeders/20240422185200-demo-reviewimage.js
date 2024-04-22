'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ReviewImages';
options.validate = true;

const demoReviewImages = [
{
  "reviewId": 1,
  "url": "www.images.com/test.png",
},
{
  "reviewId": 2,
  "url": "www.images.com/test.png",
},
{
  "reviewId": 3,
  "url": "www.images.com/test.png",
},
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await ReviewImage.bulkCreate(demoReviewImages, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
