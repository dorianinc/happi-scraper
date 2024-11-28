"use strict";

const { v4: uuidv4 } = require("uuid");
let options = {};

const scriptItemSeeds = () => {
  return [
    // Amazon
    {
      id: 1,
      type: "fill",
      step: 1,
    },

    // AAA Anime (Excluded, all fields null except essentials)
    {
      id: 2,
      type: "fill",
      step: 1,
    },

    // Big Bad Toy Store (Excluded, all fields null except essentials)
    {
      id: 3,
      type: "fill",
      step: 1,
    },

    // Crunchyroll
    {
      id: 4,
      type: "fill",
      step: 1,
    },

    // eBay
    {
      id: 5,
      type: "fill",
      step: 1,
    },
    {
      id: 6,
      type: "coordinateClick",
      step: 2,
    },

    // Entertainment Earth (Excluded, all fields null except essentials)
    {
      id: 7,
      type: "fill",
      step: 1,
    },

    // GK Figure Worldwide (Excluded, all fields null except essentials)
    {
      id: 8,
      type: "fill",
      step: 1,
    },

    // HLJ (Excluded, all fields null except essentials)
    {
      id: 9,
      type: "fill",
      step: 1,
    },

    // Japan Figure
    {
      id: 10,
      type: "fill",
      step: 1,
    },

    // Kotous
    {
      id: 11,
      type: "delay",
      step: 1,
    },
    {
      id: 12,
      type: "locatorClick",
      step: 2,
    },
    {
      id: 13,
      type: "fill",
      step: 3,
    },

    // Otaku Mode
    {
      id: 14,
      type: "fill",
      step: 1,
    },

    // Solaris Japan (Excluded, some null fields)
    {
      id: 15,
      type: "fill",
      step: 1,
    },

    // Super Anime Store
    {
      id: 16,
      type: "fill",
      step: 1,
    },
    {
      id: 17,
      type: "locatorClick",
      step: 2,
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ScriptItems";
    return queryInterface.bulkInsert(options, scriptItemSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "ScriptItems";
    return queryInterface.bulkDelete(options, null, {});
  },
  scriptItemSeeds,
};
