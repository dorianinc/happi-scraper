"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Delay extends Model {
    static associate(models) {
      Delay.belongsTo(models.ScriptItem, {
        foreignKey: "scriptItemId",
      });
    }
  }

  Delay.init(
    {
      scriptItemId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      step: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      locator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      seconds: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Delay",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return Delay;
};
