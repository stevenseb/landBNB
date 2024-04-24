'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ReviewImage.belongsTo(models.Review);
    }
  }
  ReviewImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
    tableName: 'ReviewImages',
  });
  return ReviewImage;
};
