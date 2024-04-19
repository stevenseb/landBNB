'use strict';
const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Bookings';
options.validate = true;

const demoBookings = [
{
  "spotId": 1,
  "userId": 3,
  "startDate": "2024-07-19",
  "endDate": "2024-07-23",
},
{
  "spotId": 2,
  "userId": 4,
  "startDate": "2024-09-19",
  "endDate": "2021-09-25",
},
{
  "spotId": 3,
  "userId": 5,
  "startDate": "2024-10-09",
  "endDate": "2024-10-15",
},
{
  "spotId": 5,
  "userId": 5,
  "startDate": "2024-11-19",
  "endDate": "2024-11-21",
},
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Booking.bulkCreate(demoBookings, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      SpotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
