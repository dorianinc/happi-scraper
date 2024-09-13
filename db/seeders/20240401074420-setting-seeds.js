"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const settingsSeeds = () => {
  return [
    {
      similarityThreshold: 80,
      filterLimit: 5,
      selectAll: true,
      selectHighest: true,
      darkMode: false,
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Settings";
    return queryInterface.bulkInsert(options, settingsSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Settings";
    return queryInterface.bulkDelete(options, null, {});
  },
  settingsSeeds,
};
