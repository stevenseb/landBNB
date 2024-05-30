'use strict';
const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'Users';
options.validate = true;

const demoUsers = [
  {
    firstName: 'Bob',
    lastName: 'Evans',
    email: 'bob@evans.com',
    username: 'Breakfast',
    hashedPassword: bcrypt.hashSync('greeneggs$521')
  },
  {
    firstName: 'Michelle',
    lastName: 'Jordan',
    email: 'Mike@airjordan.com',
    username: 'Airforce1',
    hashedPassword: bcrypt.hashSync('getsomeair@345')
  },
  {
    firstName: 'Mr',
    lastName: 'Bean',
    email: 'bean@funny.com',
    username: 'FrankNbeans',
    hashedPassword: bcrypt.hashSync('crazy1in##490')
  },
  {
    firstName: 'John',
    lastName: 'Dough',
    email: 'dough@gmail.com',
    username: 'Jdough',
    hashedPassword: bcrypt.hashSync('password123')
  },
  {
    firstName: 'Dave',
    lastName: 'Matthews',
    email: 'music@band.com',
    username: 'dmatt',
    hashedPassword: bcrypt.hashSync('guessmypassword')
  },
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await User.bulkCreate(demoUsers, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Breakfast', 'Airforce1', 'FrankNbeans', 'Jdough', 'dmatt'] }
    }, {});
  },
};
