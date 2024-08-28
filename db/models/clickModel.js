"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Click extends Model {
    static associate(models) {
      Click.belongsTo(models.Action, { foreignKey: "actionId" });
      Click.hasMany(models.Position, { foreignKey: "clickId" });
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
      positional: {
        type: DataTypes.BOOLEAN,
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