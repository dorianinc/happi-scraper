"use strict";
let options = {};

const locatorClickSeeds = () => {
  return [
    // Kotous
    {
      id: 1,
      locator: ".fancybox-close",
      scriptItemId: 12,
      step: 1,
    },
    // Super Anime Store
    {
      id: 2,
      locator: ".icon.icon-search",
      scriptItemId: 17,
      step: 1,
    },
    // // Amazon
    // {
    //   id: 3,
    //   locator: ".fancybox-close",
    //   scriptItemId: 69,
    //   step: 1,
    // },
    // {
    //   id: 4,
    //   locator: ".icon.icon-search",
    //   scriptItemId: 69,
    //   step: 2,
    // },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "LocatorClicks";
    return queryInterface.bulkInsert(options, locatorClickSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "LocatorClicks";
    return queryInterface.bulkDelete(options, null, {});
  },
  locatorClickSeeds,
};
