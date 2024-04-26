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
      User.hasMany(models.Spot, { foreignKey: 'ownerId' });
      User.hasMany(models.Review, { foreignKey: 'userId'});
      User.hasMany(models.Booking, { foreignKey: 'userId' });
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
        },
        async isUnique(username) {
          const user = await User.findOne({ where: { username: username } });
          if (user) {
              throw new Error('Username already exists');
          }
      },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
        async isUnique(email) {
            const user = await User.findOne({ where: { email: email } });
            if (user) {
                throw new Error('Email already exists');
            }
        },
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
