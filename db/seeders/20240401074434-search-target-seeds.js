"use strict";

let options = {};

const searchTargetSeeds = () => {
  return [
    {
      siteName: "AAA Anime",
      url: "https://AAAanime.com",
      searchFieldLocation: null,
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "Amazon",
      url: "https://www.amazon.com",
      searchFieldLocation: "input[name='field-keywords']",
      headerLocation: ".s-title-instructions-style .a-color-base.a-text-normal",
      urlLocation: ".a-link-normal.s-no-outline",
      imageLocation: ".s-product-image-container .s-image",
      priceLocation: ".srp-results .s-item__price",
      isExcluded: false,
    },
    {
      siteName: "Big Bad Toy Store",
      url: "https://bigbadtoystore.com",
      searchFieldLocation: null,
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "Crunchyroll",
      url: "https://store.crunchyroll.com",
      searchFieldLocation:
        "input[placeholder='Search apparel, figures, and more']",
      headerLocation: ".pdp-link",
      urlLocation: ".image-tile-container",
      imageLocation: ".tile-image",
      priceLocation: ".sales .value",
      isExcluded: false,
    },
    {
      siteName: "eBay",
      url: "https://www.ebay.com",
      searchFieldLocation: "input[placeholder='Search for anything']",
      headerLocation: ".srp-results .s-item__title",
      urlLocation: ".srp-results .s-item__image a",
      imageLocation: ".srp-results .s-item__image img",
      priceLocation: ".srp-results .s-item__price",
      isExcluded: false,
    },
    {
      siteName: "Entertainment Earth",
      url: "https://entertainmentearth.com",
      searchFieldLocation: null,
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "GK Figure Worldwide",
      url: "https://gkfigureworldwide.com",
      searchFieldLocation: null,
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "HLJ",
      url: "https://hlj.com",
      searchFieldLocation: null,
      headerLocation: null,
      urlLocation: null,
      imageLocation: null,
      priceLocation: null,
      isExcluded: true,
    },
    {
      siteName: "Japan Figure",
      url: "https://japan-figure.com",
      searchFieldLocation: "input[placeholder='What are you looking for?']",
      headerLocation: ".productitem--title",
      urlLocation: ".productitem--image-link",
      imageLocation: ".productitem--image-primary",
      priceLocation: ".price__current .money",
      isExcluded: false,
    },
    {
      siteName: "Kotous",
      url: "https://kotous.com",
      searchFieldLocation: "input[placeholder='Enter keywords to search...']",
      headerLocation: ".product-item-link",
      urlLocation: ".product-item-link",
      imageLocation: ".product-image-photo",
      priceLocation: ".price-final_price .price",
      isExcluded: false,
    },
    {
      siteName: "Otaku Mode",
      url: "https://otakumode.com",
      searchFieldLocation: "input[placeholder='Search Products...']",
      headerLocation: ".p-product-list__title",
      urlLocation: ".p-product-list__title",
      imageLocation: ".p-product-list__item img",
      priceLocation: ".p-price__regular",
      isExcluded: false,
    },
    {
      siteName: "Solaris Japan",
      url: "https://solarisjapan.com",
      searchFieldLocation: null,
      headerLocation: ".title",
      urlLocation: null,
      imageLocation: null,
      priceLocation: ".product-submit__btn--red .money",
      isExcluded: true,
    },
    {
      siteName: "Super Anime Store",
      url: "https://superanimestore.com",
      searchFieldLocation: "#Search-In-Modal-1",
      headerLocation: ".h5 .full-unstyled-link",
      urlLocation: ".card__information a",
      imageLocation: ".card__media .motion-reduce",
      priceLocation: ".price-item--regular",
      isExcluded: false,
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SearchTarget";
    return queryInterface.bulkInsert(options, searchTargetSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SearchTarget";
    return queryInterface.bulkDelete(options, null, {});
  },
  searchTargetSeeds,
};
