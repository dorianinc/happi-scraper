WEBSITE_CONFIGS = {
    "Amazon": {
        "id": 2,
        "url": "https://www.amazon.com",
        "search_bar_locator": "input[name='field-keywords']",
        "header_locator": ".s-title-instructions-style .a-color-base.a-text-normal",
        # "header_locator": ".a-size-base-plus.a-color-base.a-text-normal",
        "price_locator": ".srp-results .s-item__price",
        "pop_up_locator": None,
        "search_button_locator": None,
        "image_locator": ".s-product-image-container .s-image",
        "url_locator": ".a-link-normal.s-no-outline",
        "filter_results": False
    },
    "Crunchyroll": {
        "id": 4,
        "url": "https://store.crunchyroll.com",
        "search_bar_locator": "input[placeholder='Search apparel, figures, and more']",
        "header_locator": ".pdp-link",
        "price_locator": ".sales .value",
        "pop_up_locator": None,
        "search_button_locator": None,
        "image_locator": ".tile-image",
        "url_locator": ".image-tile-container",
        "filter_results": False
    },
    "eBay": {
        "id": 5,
        "url": "https://www.ebay.com",
        "search_bar_locator": "input[placeholder='Search for anything']",
        "header_locator": ".srp-results .s-item__title",
        "price_locator": ".srp-results .s-item__price",
        "pop_up_locator": None,
        "search_button_locator": None,
        "image_locator": ".srp-results .s-item__image img",
        "url_locator": ".srp-results .s-item__image a",
        "filter_results": True
    },
    "Japan Figure": {
        "id": 9,
        "url": "https://japan-figure.com",
        "search_bar_locator": "input[placeholder='What are you looking for?']",
        "header_locator": ".productitem--title",
        "price_locator": ".price__current .money",
        "pop_up_locator": None,
        "search_button_locator": None,
        "image_locator": ".productitem--image-primary",
        "url_locator": ".productitem--image-link",
        "filter_results": False
    },
    "Kotous": {
        "id": 10,
        "url": "https://kotous.com",
        "search_bar_locator": "input[placeholder='Enter keywords to search...']",
        "header_locator": ".product-item-link",
        "price_locator": ".price-final_price .price",
        # "pop_up_locator": ".fancybox-close",
        "pop_up_locator": None,
        "search_button_locator": None,
        "image_locator": ".product-image-photo",
        "url_locator": ".product-item-link",
        "filter_results": False
    },
    "Otaku Mode": {
        "id": 11,
        "url": "https://otakumode.com",
        "search_bar_locator": "input[placeholder='Search Products...']",
        "header_locator": ".p-product-list__title",
        "price_locator": ".p-price__regular",
        "pop_up_locator": None,
        "search_button_locator": None,
        "image_locator": ".p-product-list__item img",
        "url_locator": ".p-product-list__title",
        "filter_results": False
    },
    "Super Anime Store": {
        "id": 13,
        "url": "https://superanimestore.com",
        "search_bar_locator": "#Search-In-Modal-1",
        "header_locator": ".h5 .full-unstyled-link",
        "price_locator": ".price-item--regular",
        "pop_up_locator": ".privy-x",
        "search_button_locator": ".icon.icon-search",
        "image_locator": ".card__media .motion-reduce",
        "url_locator": ".card__information a",
        "filter_results": False
    }
}
