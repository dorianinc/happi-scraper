"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      Match.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  Match.init(
    {
      productId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imgSrc: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      websiteName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      similarityRating: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      excluded: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Match",
      defaultScope: {
        attributes: {
          exclude: ["createdAt"],
        },
      },
    }
  );
  return Match;
};
