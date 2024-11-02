"use strict";

const { v4: uuidv4 } = require("uuid"); 
let options = {};

const actionSeeds = () => {
  return [
    // Amazon
    {
      id: uuidv4(),
      siteName: "Amazon",
      type: "fill",
      value: "input[name='field-keywords']",
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Amazon",
      type: "get-header",
      value: ".s-title-instructions-style .a-color-base.a-text-normal",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Amazon",
      type: "get-url",
      value: ".a-link-normal.s-no-outline",
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Amazon",
      type: "get-image",
      value: ".s-product-image-container .s-image",
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Amazon",
      type: "get-price",
      value: ".srp-results .s-item__price",
      step: 5,
    },

    // AAA Anime (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "AAA Anime",
      type: "fill",
      value: null,
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "AAA Anime",
      type: "get-header",
      value: null,
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "AAA Anime",
      type: "get-url",
      value: null,
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "AAA Anime",
      type: "get-image",
      value: null,
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "AAA Anime",
      type: "get-price",
      value: null,
      step: 5,
    },

    // Big Bad Toy Store (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "Big Bad Toy Store",
      type: "fill",
      value: null,
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Big Bad Toy Store",
      type: "get-header",
      value: null,
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Big Bad Toy Store",
      type: "get-url",
      value: null,
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Big Bad Toy Store",
      type: "get-image",
      value: null,
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Big Bad Toy Store",
      type: "get-price",
      value: null,
      step: 5,
    },

    // Crunchyroll
    {
      id: uuidv4(),
      siteName: "Crunchyroll",
      type: "fill",
      value: "input[placeholder='Search apparel, figures, and more']",
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Crunchyroll",
      type: "get-header",
      value: ".pdp-link",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Crunchyroll",
      type: "get-url",
      value: ".image-tile-container",
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Crunchyroll",
      type: "get-image",
      value: ".tile-image",
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Crunchyroll",
      type: "get-price",
      value: ".sales .value",
      step: 5,
    },

    // eBay
    {
      id: uuidv4(),
      siteName: "eBay",
      type: "fill",
      value: "input[placeholder='Search for anything']",
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "eBay",
      type: "get-header",
      value: ".srp-results .s-item__title",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "eBay",
      type: "get-url",
      value: ".srp-results .s-item__image a",
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "eBay",
      type: "get-image",
      value: ".srp-results .s-item__image img",
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "eBay",
      type: "get-price",
      value: ".srp-results .s-item__price",
      step: 5,
    },

    // Entertainment Earth (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "Entertainment Earth",
      type: "fill",
      value: null,
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Entertainment Earth",
      type: "get-header",
      value: null,
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Entertainment Earth",
      type: "get-url",
      value: null,
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Entertainment Earth",
      type: "get-image",
      value: null,
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Entertainment Earth",
      type: "get-price",
      value: null,
      step: 5,
    },

    // GK Figure Worldwide (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "GK Figure Worldwide",
      type: "fill",
      value: null,
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "GK Figure Worldwide",
      type: "get-header",
      value: null,
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "GK Figure Worldwide",
      type: "get-url",
      value: null,
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "GK Figure Worldwide",
      type: "get-image",
      value: null,
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "GK Figure Worldwide",
      type: "get-price",
      value: null,
      step: 5,
    },

    // HLJ (Excluded, all fields null)
    {
      id: uuidv4(),
      siteName: "HLJ",
      type: "fill",
      value: null,
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "HLJ",
      type: "get-header",
      value: null,
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "HLJ",
      type: "get-url",
      value: null,
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "HLJ",
      type: "get-image",
      value: null,
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "HLJ",
      type: "get-price",
      value: null,
      step: 5,
    },

    // Japan Figure
    {
      id: uuidv4(),
      siteName: "Japan Figure",
      type: "fill",
      value: "input[placeholder='What are you looking for?']",
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Japan Figure",
      type: "get-header",
      value: ".productitem--title",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Japan Figure",
      type: "get-url",
      value: ".productitem--image-link",
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Japan Figure",
      type: "get-image",
      value: ".productitem--image-primary",
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Japan Figure",
      type: "get-price",
      value: ".price__current .money",
      step: 5,
    },

    // Kotous
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "fill",
      value: "input[placeholder='Enter keywords to search...']",
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "get-header",
      value: ".product-item-link",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "get-url",
      value: ".product-item-link",
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "get-image",
      value: ".product-image-photo",
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Kotous",
      type: "get-price",
      value: ".price-final_price .price",
      step: 5,
    },

    // Otaku Mode
    {
      id: uuidv4(),
      siteName: "Otaku Mode",
      type: "fill",
      value: "input[placeholder='Search Products...']",
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Otaku Mode",
      type: "get-header",
      value: ".p-product-list__title",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Otaku Mode",
      type: "get-url",
      value: ".p-product-list__title",
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Otaku Mode",
      type: "get-image",
      value: ".p-product-list__item img",
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Otaku Mode",
      type: "get-price",
      value: ".p-price__regular",
      step: 5,
    },

    // Solaris Japan (Excluded, some null fields)
    {
      id: uuidv4(),
      siteName: "Solaris Japan",
      type: "fill",
      value: null,
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Solaris Japan",
      type: "get-header",
      value: ".title",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Solaris Japan",
      type: "get-url",
      value: null,
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Solaris Japan",
      type: "get-image",
      value: null,
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Solaris Japan",
      type: "get-price",
      value: ".product-submit__btn--red .money",
      step: 5,
    },

    // Super Anime Store
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "fill",
      value: "#Search-In-Modal-1",
      step: 1,
    },
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "get-header",
      value: ".h5 .full-unstyled-link",
      step: 2,
    },
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "get-url",
      value: ".card__information a",
      step: 3,
    },
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "get-image",
      value: ".card__media .motion-reduce",
      step: 4,
    },
    {
      id: uuidv4(),
      siteName: "Super Anime Store",
      type: "get-price",
      value: ".price-item--regular",
      step: 5,
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Actions";
    return queryInterface.bulkInsert(options, actionSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Actions";
    return queryInterface.bulkDelete(options, null, {});
  },
  actionSeeds,
};
