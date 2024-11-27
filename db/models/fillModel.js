"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Fill extends Model {
    static associate(models) {
      Fill.belongsTo(models.ScriptItem, {
        foreignKey: "scriptItemId",
      });
    }
  }

  Fill.init(
    {
      scriptItemId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      step: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      locator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Fill",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return Fill;
};
