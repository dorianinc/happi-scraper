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
      endUrl: "https://www.amazon.com/s?k=charmander+pop"
    },
    // {
    //   id: 69,
    //   siteName: "Amazon",
    //   type: "locatorClick",
    //   step: 1,
    // },

    // AAA Anime (Excluded, all fields null except essentials)
    {
      id: 2,
      siteName: "AAA Anime",
      type: "fill",
      step: 1,
      endUrl: "https://www.aaaanime.com/search?s=charmander+pop"
    },

    // Big Bad Toy Store (Excluded, all fields null except essentials)
    {
      id: 3,
      siteName: "Big Bad Toy Store",
      type: "fill",
      step: 1,
      endUrl: "https://www.bigbadtoystore.com/Search?SearchText=goku+pop&o=4"
    },

    // Crunchyroll
    {
      id: 4,
      siteName: "Crunchyroll",
      type: "fill",
      step: 1,
      endUrl: "https://store.crunchyroll.com/search?q=Gohan+Beast+Ichibansho+Figure&search-button=&lang=en_US"
    },

    // eBay
    {
      id: 5,
      siteName: "eBay",
      type: "fill",
      step: 1,
      endUrl: "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=charmander+pop&_sacat=0"
    },
    {
      id: 6,
      siteName: "eBay",
      type: "coordinateClick",
      step: 2,
      endUrl: "https://www.ebay.com/sch/i.html?_from=R40&_nkw=charmander+pop&_sacat=0&rt=nc&LH_ItemCondition=3"
    },

    // Entertainment Earth (Excluded, all fields null except essentials)
    {
      id: 7,
      siteName: "Entertainment Earth",
      type: "fill",
      step: 1,
      endUrl: "https://www.entertainmentearth.com/s/?query1=charmander+pop"
    },

    // GK Figure Worldwide (Excluded, all fields null except essentials)
    {
      id: 8,
      siteName: "GK Figure Worldwide",
      type: "fill",
      step: 1,
      endUrl: "https://www.gkfigureworldwide.com/search-results?q=cute+frieren+resin"
    },

    // HLJ (Excluded, all fields null except essentials)
    {
      id: 9,
      siteName: "HLJ",
      type: "fill",
      step: 1,
      endUrl: "https://hlj.com/search/?Word=Figure-rise%20Standard%20Super%20Saiyan%202%20Gohan"
    },

    // Japan Figure
    {
      id: 10,
      siteName: "Japan Figure",
      type: "fill",
      step: 1,
      endUrl: "https://japan-figure.com/search?q=Bandai+Spirits+Dragon+Ball+Z+Son+Gohan+SSJ2"
    },

    // Kotous
    {
      id: 11,
      siteName: "Kotous",
      type: "delay",
      step: 1,
      endUrl: "https://kotous.com/"
    },
    {
      id: 12,
      siteName: "Kotous",
      type: "locatorClick",
      step: 2,
      endUrl: "https://kotous.com/"
    },
    {
      id: 13,
      siteName: "Kotous",
      type: "fill",
      step: 3,
      endUrl: "https://kotous.com/"
    },

    // Otaku Mode
    {
      id: 14,
      siteName: "Otaku Mode",
      type: "fill",
      step: 1,
      endUrl: "https://otakumode.com/search?category=&keyword=Dragon%20Ball%20Legends%20Collab%20Gohan"
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
