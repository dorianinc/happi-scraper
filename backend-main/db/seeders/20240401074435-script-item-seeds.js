"use strict";

const { v4: uuidv4 } = require("uuid"); 
let options = {};

const scriptItemSeeds = () => {
  return [
    // Amazon
    {
      id: uuidv4(),
      siteName: "Amazon",
      type: "fill",
      locator: "input[name='field-keywords']",
      step: 1,
    },


    // AAA Anime (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "AAA Anime",
      type: "fill",
      locator: null,
      step: 1,
    },


    // Big Bad Toy Store (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "Big Bad Toy Store",
      type: "fill",
      locator: null,
      step: 1,
    },


    // Crunchyroll
    {
      id: uuidv4(),
      siteName: "Crunchyroll",
      type: "fill",
      locator: "input[placeholder='Search apparel, figures, and more']",
      step: 1,
    },


    // eBay
    {
      id: uuidv4(),
      siteName: "eBay",
      type: "fill",
      locator: "input[placeholder='Search for anything']",
      step: 1,
    },


    // Entertainment Earth (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "Entertainment Earth",
      type: "fill",
      locator: null,
      step: 1,
    },


    // GK Figure Worldwide (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "GK Figure Worldwide",
      type: "fill",
      locator: null,
      step: 1,
    },


    // HLJ (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "HLJ",
      type: "fill",
      locator: null,
      step: 1,
    },


    // Japan Figure
    {
      id: uuidv4(),
      siteName: "Japan Figure",
      type: "fill",
      locator: "input[placeholder='What are you looking for?']",
      step: 1,
    },


    // Kotous
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "waitForTimeout",
      locator: "5000",
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "click",
      locator: ".fancybox-close",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "fill",
      locator: "input[placeholder='Enter keywords to search...']",
      step: 3,
    },

    // Otaku Mode
    {
      id: uuidv4(),
      siteName: "Otaku Mode",
      type: "fill",
      locator: "input[placeholder='Search Products...']",
      step: 1,
    },


    // Solaris Japan (Excluded, some null fields)
    {
      id: uuidv4(),
      siteName: "Solaris Japan",
      type: "fill",
      locator: null,
      step: 1,
    },

    // Super Anime Store
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "fill",
      locator: "#Search-In-Modal-1",
      step: 1,
    },
    // click search button probably wont work thanks to indexing issue
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "click",
      locator: ".icon.icon-search",
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
