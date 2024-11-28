"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CoordinateClick extends Model {
    static associate(models) {
      CoordinateClick.belongsTo(models.ScriptItem, {
        foreignKey: "scriptItemId",
      });
    }
  }

  CoordinateClick.init(
    {
      scriptItemId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      step: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      x1: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      x2: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      y1: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      y2: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "CoordinateClick",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return CoordinateClick;
};
