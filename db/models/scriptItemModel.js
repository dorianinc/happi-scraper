"use strict";
const { Model, STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ScriptItem extends Model {
    static associate(models) {
      ScriptItem.belongsTo(models.Script, { foreignKey: "scriptId" });
      ScriptItem.hasMany(models.CoordinateClick, {
        foreignKey: "scriptItemId",
      });
      ScriptItem.hasMany(models.LocatorClick, { foreignKey: "scriptItemId" });
      ScriptItem.hasMany(models.Delay, { foreignKey: "scriptItemId" });
      ScriptItem.hasMany(models.Fill, { foreignKey: "scriptItemId" });
    }
  }

  ScriptItem.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      scriptId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      step: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      endUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      errorMessage: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "ScriptItem",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return ScriptItem;
};
