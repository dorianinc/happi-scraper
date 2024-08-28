"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Website extends Model {
    static associate(models) {
      Website.hasMany(models.Action, { foreignKey: "websiteName" });
      Website.hasMany(models.Item, { foreignKey: "websiteName" });
    }
  }
  Website.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      searchBarLocation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      excluded: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Website",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return Website;
};
