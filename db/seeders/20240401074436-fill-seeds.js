"use strict";

let options = {};

const fillSeeds = () => {
  return [
    // Amazon
    {
      id: 1,
      locator: "input[name='field-keywords']",
      scriptItemId: 1,
      step: 1,
    },

    // AAA Anime (Excluded, all fields null except essentials)
    {
      id: 2,
      locator: null,
      scriptItemId: 2,
      step: 1,
    },

    // Big Bad Toy Store (Excluded, all fields null except essentials)
    {
      id: 3,
      locator: null,
      scriptItemId: 3,
      step: 1,
    },

    // Crunchyroll
    {
      id: 4,
      locator: "input[placeholder='Search apparel, figures, and more']",
      scriptItemId: 4,
      step: 1,
    },

    // eBay
    {
      id: 5,
      locator: "input[placeholder='Search for anything']",
      scriptItemId: 5,
      step: 1,
    },

    // Entertainment Earth (Excluded, all fields null except essentials)
    {
      id: 6,
      locator: null,
      scriptItemId: 7,
      step: 1,
    },

    // GK Figure Worldwide (Excluded, all fields null except essentials)
    {
      id: 7,
      locator: null,
      scriptItemId: 8,
      step: 1,
    },

    // HLJ (Excluded, all fields null except essentials)
    {
      id: 8,
      locator: null,
      scriptItemId: 9,
      step: 1,
    },

    // Japan Figure
    {
      id: 9,
      locator: "input[placeholder='What are you looking for?']",
      scriptItemId: 10,
      step: 1,
    },

    // Kotous
    // {
    //   id: 10,
    //   type: "waitForTimeout",
    //   locator: "5000",
    //   scriptItemId: 10,
    //   step: 1,
    // },
    // {
    //   id: 11,
    //   type: "click",
    //   locator: ".fancybox-close",
    //   scriptItemId: 11,
    //   step: 2,
    // },
    {
      id: 10,
      locator: "input[placeholder='Enter keywords to search...']",
      scriptItemId: 13,
      step: 1,
    },

    // Otaku Mode
    {
      id: 13,
      locator: "input[placeholder='Search Products...']",
      scriptItemId: 14,
      step: 1,
    },

    // Solaris Japan (Excluded, some null fields)
    {
      id: 14,
      locator: null,
      scriptItemId: 15,
      step: 1,
    },

    // Super Anime Store
    {
      id: 15,
      locator: "#Search-In-Modal-1",
      scriptItemId: 16,
      step: 1,
    },
    // {
    //   id: 16,
    //   locator: ".icon.icon-search",
    //   scriptItemId: 16,
    //   step: 2,
    // },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Fills";
    return queryInterface.bulkInsert(options, fillSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "ScriptItems";
    return queryInterface.bulkDelete(options, null, {});
  },
  fillSeeds,
};
