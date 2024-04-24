'use strict';

let options = {};
options.tableName = 'ReviewImages';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(options, 'reviewId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Reviews',
        key: 'id',
      },  
    onDelete: 'CASCADE'
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(options, 'reviewId', {
      type: Sequelize.INTEGER,
      allowNull: false,
  });
  }
};
