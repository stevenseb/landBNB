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
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@gmail.com',
    username: 'AJAJ',
    hashedPassword: bcrypt.hashSync('password321')
  },
  {
    firstName: 'Emily',
    lastName: 'Smith',
    email: 'emily@smith.com',
    username: 'Esmith',
    hashedPassword: bcrypt.hashSync('smith123')
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'mbrown@yahoo.com',
    username: 'Mbrown',
    hashedPassword: bcrypt.hashSync('brownie456')
  },
  {
    firstName: 'Jessica',
    lastName: 'Davis',
    email: 'jdavis@gmail.com',
    username: 'JessD',
    hashedPassword: bcrypt.hashSync('jd123')
  },
  {
    firstName: 'Jess',
    lastName: 'Davis',
    email: 'davis@gmail.com',
    username: 'JessWorld',
    hashedPassword: bcrypt.hashSync('jd456')
  },
  {
    firstName: 'Christopher',
    lastName: 'Wilson',
    email: 'chris.wilson@hotmail.com',
    username: 'ChrisW',
    hashedPassword: bcrypt.hashSync('wilson789')
  },
  {
    firstName: 'Samantha',
    lastName: 'Martinez',
    email: 'smartinez@gmail.com',
    username: 'SamM',
    hashedPassword: bcrypt.hashSync('sammy321')
  },
  {
    firstName: 'Daniel',
    lastName: 'Taylor',
    email: 'dtaylor@yahoo.com',
    username: 'DannyT',
    hashedPassword: bcrypt.hashSync('taylor456')
  },
  {
    firstName: 'Sarah',
    lastName: 'Moore',
    email: 'sarah.moore@gmail.com',
    username: 'Smoore',
    hashedPassword: bcrypt.hashSync('moore789')
  },
  {
    firstName: 'Sam',
    lastName: 'Moore',
    email: 'sam.moore@gmail.com',
    username: 'Boogie',
    hashedPassword: bcrypt.hashSync('boogie789')
  },
  {
    firstName: 'Matt',
    lastName: 'Johnson',
    email: 'me@hotmail.com',
    username: 'MattL',
    hashedPassword: bcrypt.hashSync('leematt')
  },
  {
    firstName: 'Matthew',
    lastName: 'Lee',
    email: 'mlee@hotmail.com',
    username: 'Mattz',
    hashedPassword: bcrypt.hashSync('leematz')
  },
  {
    firstName: 'Lauren',
    lastName: 'Garcia',
    email: 'lauren.garcia@yahoo.com',
    username: 'Lgarcia',
    hashedPassword: bcrypt.hashSync('garcia123')
  },
  {
    firstName: 'Sara',
    lastName: 'Garcia',
    email: 'sara.garcia@yahoo.com',
    username: 'Sgarcia',
    hashedPassword: bcrypt.hashSync('garcia789')
  },
  {
    firstName: 'Demo',
    lastName: 'lition',
    email: 'demo@demo.com',
    username: 'demo',
    hashedPassword: bcrypt.hashSync('demo')
  },
];


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
