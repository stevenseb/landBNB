'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: 'ownerId'});
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' });
      Spot.hasMany(models.Review, { foreignKey: 'spotId'});
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
    city: {
      type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
    state: {
      type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
    country: {
      type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
      // notEmpty: true,
      // validate: {
      //   min: -90,
      //   max: 90,
      // }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true,
      // notEmpty: true,
      // validate: {
      //   min: -180,
      //   max: 180,
      //   },
    },
    name: {
      type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
    description: {
      type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,
    }
  }, {
    sequelize,
    modelName: 'Spot',
    tableName: 'Spots'
  });
  return Spot;
};
