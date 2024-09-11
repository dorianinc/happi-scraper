"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Click extends Model {
    static associate(models) {
      Click.belongsTo(models.Action, { foreignKey: "actionId" });
    }
  }

  Click.init(
    {
      actionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      delay: {
        type: DataTypes.INTEGER,
      },
      locator: {
        type: DataTypes.STRING,
      },
      isPositional: {
        type: DataTypes.BOOLEAN,
      },
      left: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      height: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      width: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Click",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }
    }
  );

  return Click;
};