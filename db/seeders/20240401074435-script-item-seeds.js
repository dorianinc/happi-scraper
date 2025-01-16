"use strict";

let options = {};

const scriptItemSeeds = () => {
  return [
    // Amazon
    {
      id: 1,
      scriptId: 2,
      type: "fill",
      step: 1,
      endUrl: "https://www.amazon.com/s?k=charmander+pop",
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
      scriptId: 1,
      type: "fill",
      step: 1,
      endUrl: "https://www.aaaanime.com/search?s=charmander+pop",
    },

    // Big Bad Toy Store (Excluded, all fields null except essentials)
    {
      id: 3,
      scriptId: 3,
      type: "fill",
      step: 1,
      endUrl: "https://www.bigbadtoystore.com/Search?SearchText=goku+pop&o=4",
    },

    // Crunchyroll
    {
      id: 4,
      scriptId: 4,
      type: "fill",
      step: 1,
      endUrl:
        "https://store.crunchyroll.com/search?q=Gohan+Beast+Ichibansho+Figure&search-button=&lang=en_US",
    },

    // eBay
    {
      id: 5,
      scriptId: 5,
      type: "fill",
      step: 1,
      endUrl:
        "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=charmander+pop&_sacat=0",
    },
    {
      id: 6,
      scriptId: 5,
      type: "coordinateClick",
      step: 2,
      endUrl:
        "https://www.ebay.com/sch/i.html?_from=R40&_nkw=charmander+pop&_sacat=0&rt=nc&LH_ItemCondition=3",
    },

    // Entertainment Earth (Excluded, all fields null except essentials)
    {
      id: 7,
      scriptId: 6,
      type: "fill",
      step: 1,
      endUrl: "https://www.entertainmentearth.com/s/?query1=charmander+pop",
    },

    // GK Figure Worldwide (Excluded, all fields null except essentials)
    {
      id: 8,
      scriptId: 7,
      type: "fill",
      step: 1,
      endUrl:
        "https://www.gkfigureworldwide.com/search-results?q=cute+frieren+resin",
    },

    // HLJ (Excluded, all fields null except essentials)
    {
      id: 9,
      scriptId: 8,
      type: "fill",
      step: 1,
      endUrl:
        "https://hlj.com/search/?Word=Figure-rise%20Standard%20Super%20Saiyan%202%20Gohan",
    },

    // Japan Figure
    {
      id: 10,
      scriptId: 9,
      type: "fill",
      step: 1,
      endUrl:
        "https://japan-figure.com/search?q=Bandai+Spirits+Dragon+Ball+Z+Son+Gohan+SSJ2",
    },

    // Kotous
    {
      id: 11,
      scriptId: 10,
      type: "delay",
      step: 1,
      endUrl: "https://kotous.com/",
    },
    {
      id: 12,
      scriptId: 10,
      type: "locatorClick",
      step: 2,
      endUrl: "https://kotous.com/",
    },
    {
      id: 13,
      scriptId: 10,
      type: "fill",
      step: 3,
      endUrl: "https://kotous.com/",
    },

    // Otaku Mode
    {
      id: 14,
      scriptId: 11,
      type: "fill",
      step: 1,
      endUrl:
        "https://otakumode.com/search?category=&keyword=Dragon%20Ball%20Legends%20Collab%20Gohan",
    },

    // Solaris Japan (Excluded, some null fields)
    {
      id: 15,
      scriptId: 12,
      type: "fill",
      step: 1,
    },

    // Super Anime Store
    {
      id: 16,
      scriptId: 13,
      type: "fill",
      step: 1,
    },
    {
      id: 17,
      scriptId: 13,
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
