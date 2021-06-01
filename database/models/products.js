'use strict';
const {
  Model
} = require('sequelize');

const categories = require("./categories");

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.categories = this.belongsTo(models.categories, {foreignKey: "categoryid"})
    }
  };
  products.init(
      {
          heading: DataTypes.JSONB,
          articul: DataTypes.STRING,
          slug: DataTypes.STRING,
          picture: DataTypes.JSONB,
          categoryid: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'categories',
              key: 'id',
              as: 'categoryid',
            },
          },
      },
      {
          sequelize,
          modelName: "products",
      }
  );
  return products;
};