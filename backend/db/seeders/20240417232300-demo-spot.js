'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';
options.validate = true;




const demoSpots = [
  {
    "ownerId": 1,
    "address": "123 Disney Lane",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "Mickey's House",
    "description": "Place where a kid can be a kid",
    "price": 123,
  },
  {
    "ownerId": 1,
    "address": "123 Sand Street",
    "city": "Fort Lauderdale",
    "state": "Florida",
    "country": "United States of America",
    "lat": 39.7645358,
    "lng": -90.4730327,
    "name": "Beach House",
    "description": "People like to get all sandy",
    "price": 159,
  },
  {
    "ownerId": 2,
    "address": "123 River Road",
    "city": "Biloxi",
    "state": "Mississippi",
    "country": "United States of America",
    "lat": 39.7645358,
    "lng": -101.4730327,
    "name": "River Rat",
    "description": "A great place to practice your noodling technique",
    "price": 89,
  },
  {
    "ownerId": 3,
    "address": "123 Deep Forest Way",
    "city": "Seattle",
    "state": "Washington",
    "country": "United States of America",
    "lat": 33.7645358,
    "lng": -123.4730327,
    "name": "Forest Gnome Home",
    "description": "A great place to get away from it all....whatever IT is",
    "price": 189,
  },
  {
    "ownerId": 3,
    "address": "123 Dead End Street",
    "city": "Wichita",
    "state": "Kansas",
    "country": "United States of America",
    "lat": 42.7645358,
    "lng": -110.4730327,
    "name": "House at the End of the Street",
    "description": "You shouldn't encounter very much traffic here, it's a dead end",
    "price": 225,
  },
];



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate(demoSpots, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
