"use strict";
const { Model, STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ScriptItem extends Model {
    static associate(models) {
      ScriptItem.belongsTo(models.Script, { foreignKey: "siteName" });
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
        type: DataTypes.UUID,
      },
      siteName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      step: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      startUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      endUrl: {
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
