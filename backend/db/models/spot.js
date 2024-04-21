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
      Spot.belongsTo(models.User, { foreginKey: 'spotId'});
      Spot.belongsToMany(models.Review, { foreignKey: 'spotId'});
      Spot.belongsToMany(
        models.User,
        {
          through: models.Booking,
            foreignKey: 'spotId',
            otherKey: 'userId'
        }
      );
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
      },
    city: {
      type: DataTypes.STRING,
        allowNull: false,
      },
    state: {
      type: DataTypes.STRING,
        allowNull: false,
      },
    country: {
      type: DataTypes.STRING,
        allowNull: false,
      },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -90,
        max: 90,
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -180,
        max: 180,
        },
    },
    name: {
      type: DataTypes.STRING,
        allowNull: false,
      },
    description: {
      type: DataTypes.STRING,
        allowNull: false,
      },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
