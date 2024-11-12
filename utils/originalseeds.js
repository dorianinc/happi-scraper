"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const websiteSeeds = () => {
  return [
    {
      // ebay, need to add filter results somehow
      popUpLocator: null,
      searchButtonLocator: null,
      popUpCheck: false,
      filterCheck: true,
      searchButtonCheck: false,
      excluded: false,
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Websites";
    return queryInterface.bulkInsert(options, websiteSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Websites";
    return queryInterface.bulkDelete(options, null, {});
  },
  websiteSeeds
};