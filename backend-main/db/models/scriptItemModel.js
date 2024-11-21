"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ScriptItem extends Model {
    static associate(models) {
      ScriptItem.belongsTo(models.Script, { foreignKey: "siteName" });
      ScriptItem.hasMany(models.CoordinateClick, {
        foreignKey: "scriptItemId",
      });
      ScriptItem.hasMany(models.WaitTimeout, { foreignKey: "scriptItemId" });
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
      step: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      locator: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      startUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      endUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
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
