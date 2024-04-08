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
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
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
      },
    },
    {
      sequelize,
      modelName: "Product",
      defaultScope: {
        attributes: {
          exclude: ["updatedAt"],
        },
      },
    }
  );
  return Product;
};
