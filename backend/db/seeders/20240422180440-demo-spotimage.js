'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'SpotImages';
options.validate = true;

const demoSpotImages = [
  {
    "spotId": 1,
    "url": "www.images.com/test.png",
    "preview": true,
  },
  {
    'spotId': 1,
    "url": "www.images.com/test.png",
    "preview": false,
  },
  {
    'spotId': 2,
    "url": "www.images.com/test.png",
    "preview": true,
  },
  {
    'spotId': 3,
    "url": "www.images.com/test.png",
    "preview": true,
  },
  {
    'spotId': 4,
    "url": "www.images.com/test.png",
    "preview": true,
  },
  {
    'spotId': 5,
    "url": "www.images.com/test.png",
    "preview": true,
  },
  {
    'spotId': 5,
    "url": "www.images.com/test.png",
    "preview": false,
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate(demoSpotImages, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      SpotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
