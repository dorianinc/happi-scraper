"use strict";

let options = {};

const scriptItemSeeds = () => {
  return [
    // Amazon
    {
      id: 1,
      siteName: "Amazon",
      type: "fill",
      step: 1,
    },

    // AAA Anime (Excluded, all fields null except essentials)
    {
      id: 2,
      siteName: "AAA Anime",
      type: "fill",
      step: 1,
    },

    // Big Bad Toy Store (Excluded, all fields null except essentials)
    {
      id: 3,
      siteName: "Big Bad Toy Store",
      type: "fill",
      step: 1,
    },

    // Crunchyroll
    {
      id: 4,
      siteName: "Crunchyroll",
      type: "fill",
      step: 1,
    },

    // eBay
    {
      id: 5,
      siteName: "eBay",
      type: "fill",
      step: 1,
    },
    {
      id: 6,
      siteName: "eBay",
      type: "coordinateClick",
      step: 2,
    },

    // Entertainment Earth (Excluded, all fields null except essentials)
    {
      id: 7,
      siteName: "Entertainment Earth",
      type: "fill",
      step: 1,
    },

    // GK Figure Worldwide (Excluded, all fields null except essentials)
    {
      id: 8,
      siteName: "GK Figure Worldwide",
      type: "fill",
      step: 1,
    },

    // HLJ (Excluded, all fields null except essentials)
    {
      id: 9,
      siteName: "HLJ",
      type: "fill",
      step: 1,
    },

    // Japan Figure
    {
      id: 10,
      siteName: "Japan Figure",
      type: "fill",
      step: 1,
    },

    // Kotous
    {
      id: 11,
      siteName: "Kotous",
      type: "delay",
      step: 1,
    },
    {
      id: 12,
      siteName: "Kotous",
      type: "locatorClick",
      step: 2,
    },
    {
      id: 13,
      siteName: "Kotous",
      type: "fill",
      step: 3,
    },

    // Otaku Mode
    {
      id: 14,
      siteName: "Otaku Mode",
      type: "fill",
      step: 1,
    },

    // Solaris Japan (Excluded, some null fields)
    {
      id: 15,
      siteName: "Solaris Japan",
      type: "fill",
      step: 1,
    },

    // Super Anime Store
    {
      id: 16,
      siteName: "Super Anime Store",
      type: "fill",
      step: 1,
    },
    {
      id: 17,
      siteName: "Super Anime Store",
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
