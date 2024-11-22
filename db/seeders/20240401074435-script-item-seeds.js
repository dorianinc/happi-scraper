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
      startUrl: "https://www.amazon.com/",
      endUrl:
        "https://www.amazon.com/s?k=charmander&crid=3QZSVAIFUU5U8&sprefix=bulbasaur%2Caps%2C138&ref=nb_sb_noss_1",
    },

    // AAA Anime (Excluded, all fields null except essentials)
    {
      id: uuidv4(),
      siteName: "AAA Anime",
      type: "fill",
      locator: null,
      step: 1,
      startUrl: "https://AAAanime.com",
      endUrl: "https://www.aaaanime.com/search?s=charmander",
    },

    // Big Bad Toy Store (Excluded, all fields null except essentials)
    {
      id: uuidv4(),
      siteName: "Big Bad Toy Store",
      type: "fill",
      locator: null,
      step: 1,
      startUrl: "https://bigbadtoystore.com",
      endUrl: "https://www.bigbadtoystore.com/Search?SearchText=charmander&o=4",
    },

    // Crunchyroll
    {
      id: uuidv4(),
      siteName: "Crunchyroll",
      type: "fill",
      locator: "input[placeholder='Search apparel, figures, and more']",
      step: 1,
      startUrl: "https://store.crunchyroll.com",
      endUrl: "https://store.crunchyroll.com/search?q=naruto+uzumaki&search-button=&lang=en_US",
    },

    // eBay
    {
      id: uuidv4(),
      siteName: "eBay",
      type: "fill",
      locator: "input[placeholder='Search for anything']",
      step: 1,
      startUrl: "https://www.ebay.com",
      endUrl: "https://www.ebay.com/sch/i.html?_nkw=charmander&_sacat=0&_from=R40&_trksid=p4432023.m570.l1313",
    },

    // Entertainment Earth (Excluded, all fields null except essentials)
    {
      id: uuidv4(),
      siteName: "Entertainment Earth",
      type: "fill",
      locator: null,
      step: 1,
      startUrl: "https://entertainmentearth.com",
      endUrl: "https://www.entertainmentearth.com/s/?query1=charmander",
    },

    // GK Figure Worldwide (Excluded, all fields null except essentials)
    {
      id: uuidv4(),
      siteName: "GK Figure Worldwide",
      type: "fill",
      locator: null,
      step: 1,
      startUrl: "https://gkfigureworldwide.com",
      endUrl: "https://www.gkfigureworldwide.com/search-results?q=charmander",
    },

    // HLJ (Excluded, all fields null except essentials)
    {
      id: uuidv4(),
      siteName: "HLJ",
      type: "fill",
      locator: null,
      step: 1,
      startUrl: "https://hlj.com",
      endUrl: "https://www.hlj.com/search/?Word=charmander",
    },

    // Japan Figure
    {
      id: uuidv4(),
      siteName: "Japan Figure",
      type: "fill",
      locator: "input[placeholder='What are you looking for?']",
      step: 1,
      startUrl: "https://japan-figure.com",
      endUrl: "https://japan-figure.com/search?q=charmander",
    },

    // Kotous
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "waitForTimeout",
      locator: "5000",
      step: 1,
      startUrl: "https://kotous.com",
      endUrl: "https://kotous.com",
    },
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "click",
      locator: ".fancybox-close",
      step: 2,
      startUrl: "https://kotous.com",
      endUrl: "https://kotous.com",
    },
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "fill",
      locator: "input[placeholder='Enter keywords to search...']",
      step: 3,
      startUrl: "https://kotous.com",
      endUrl: "https://kotous.com/catalogsearch/result/?cat=&q=naruto+uzumaki",
    },

    // Otaku Mode
    {
      id: uuidv4(),
      siteName: "Otaku Mode",
      type: "fill",
      locator: "input[placeholder='Search Products...']",
      step: 1,
      startUrl: "https://otakumode.com",
      endUrl: "https://otakumode.com/search?category=&keyword=charmander",
    },

    // Solaris Japan (Excluded, some null fields)
    {
      id: uuidv4(),
      siteName: "Solaris Japan",
      type: "fill",
      locator: null,
      step: 1,
      startUrl: "https://solarisjapan.com",
      endUrl: "https://solarisjapan.com/search/?query=charmander",
    },

    // Super Anime Store
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "fill",
      locator: "#Search-In-Modal-1",
      step: 1,
      startUrl: "https://superanimestore.com",
      endUrl: "https://superanimestore.com",
    },
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "click",
      locator: ".icon.icon-search",
      step: 2,
      startUrl: "https://superanimestore.com",
      endUrl: "https://superanimestore.com/search?q=charmander&options%5Bprefix%5D=last",
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
