'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // association for group organizer
      User.hasMany(models.Spot, { foreignKey: 'ownerId' });
      User.hasMany(models.Review, 
        {
          through: models.Review,
          foreignKey: 'userId',
          otherKey: 'spotId'
          });
      User.belongsToMany(
          models.Spot,
          {
            through: models.Booking,
            foreignKey: 'userId',
            otherKey: 'spotId'
          });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        notEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username can not be an email address.');
          }
          
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
  });
  return User;
};
