"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Match, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imgSrc: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      avgPrice: {
        allowNull: true,
        type: DataTypes.DECIMAL,
      }
    },
    {
      sequelize,
      modelName: "Product"
    }
  );
  return Product;
};