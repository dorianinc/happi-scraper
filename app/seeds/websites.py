from app.models import db, Website, environment, SCHEMA
from sqlalchemy.sql import text


def seed_websites():
    websites_data = [
        {
            "name": "AAA Anime",
            "url": "https://AAAanime.com",
            "search_bar_locator": None,
            "header_locator": None,
            "price_locator": None,
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": None,
            "url_locator": None,
            "filter_results": None,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": True
        },
        {
            "name": "Amazon",
            "url": "https://www.amazon.com",
            "search_bar_locator": "input[name='field-keywords']",
            "header_locator": ".s-title-instructions-style .a-color-base.a-text-normal",
            "price_locator": ".srp-results .s-item__price",
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": ".s-product-image-container .s-image",
            "url_locator": ".a-link-normal.s-no-outline",
            "filter_results": False,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": False
        },
        {
            "name": "Big Bad Toy Store",
            "url": "https://bigbadtoystore.com",
            "search_bar_locator": None,
            "header_locator": None,
            "price_locator": None,
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": None,
            "url_locator": None,
            "filter_results": None,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": True
        },
        {
            "name": "Crunchyroll",
            "url": "https://store.crunchyroll.com",
            "search_bar_locator": "input[placeholder='Search apparel, figures, and more']",
            "header_locator": ".pdp-link",
            "price_locator": ".sales .value",
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": ".tile-image",
            "url_locator": ".image-tile-container",
            "filter_results": False,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": False
        },
        {
            "name": "eBay",
            "url": "https://www.ebay.com",
            "search_bar_locator": "input[placeholder='Search for anything']",
            "header_locator": ".srp-results .s-item__title",
            "price_locator": ".srp-results .s-item__price",
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": ".srp-results .s-item__image img",
            "url_locator": ".srp-results .s-item__image a",
            "filter_results": True,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": False
        },
        {
            "name": "Entertainment Earth",
            "url": "https://entertainmentearth.com",
            "search_bar_locator": None,
            "header_locator": None,
            "price_locator": None,
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": None,
            "url_locator": None,
            "filter_results": None,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": True
        },
        {
            "name": "GK Figure Worldwide",
            "url": "https://gkfigureworldwide.com",
            "search_bar_locator": None,
            "header_locator": None,
            "price_locator": None,
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": None,
            "url_locator": None,
            "filter_results": None,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": True
        },
        {
            "name": "HLJ",
            "url": "https://hlj.com",
            "search_bar_locator": None,
            "header_locator": None,
            "price_locator": None,
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": None,
            "url_locator": None,
            "filter_results": None,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": True
        },
        {
            "name": "Japan Figure",
            "url": "https://japan-figure.com",
            "search_bar_locator": "input[placeholder='What are you looking for?']",
            "header_locator": ".productitem--title",
            "price_locator": ".price__current .money",
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": ".productitem--image-primary",
            "url_locator": ".productitem--image-link",
            "filter_results": False,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": False
        },
        {
            "name": "Kotous",
            "url": "https://kotous.com",
            "search_bar_locator": "input[placeholder='Enter keywords to search...']",
            "header_locator": ".product-item-link",
            "price_locator": ".price-final_price .price",
            "pop_up_locator": ".fancybox-close",
            "search_button_locator": None,
            "image_locator": ".product-image-photo",
            "url_locator": ".product-item-link",
            "filter_results": False,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": False
        },
        {
            "name": "Otaku Mode",
            "url": "https://otakumode.com",
            "search_bar_locator": "input[placeholder='Search Products...']",
            "header_locator": ".p-product-list__title",
            "price_locator": ".p-price__regular",
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": ".p-product-list__item img",
            "url_locator": ".p-product-list__title",
            "filter_results": False,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": False
        },
        {
            "name": "Solaris Japan",
            "url": "https://solarisjapan.com",
            "search_bar_locator": None,
            "header_locator": ".title",
            "price_locator": ".product-submit__btn--red .money",
            "pop_up_locator": None,
            "search_button_locator": None,
            "image_locator": None,
            "url_locator": None,
            "filter_results": None,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": False,
            "excluded": True
        },
        {
            "name": "Super Anime Store",
            "url": "https://superanimestore.com",
            "search_bar_locator": "#Search-In-Modal-1",
            "header_locator": ".h5 .full-unstyled-link",
            "price_locator": ".price-item--regular",
            "pop_up_locator": ".privy-x",
            "search_button_locator": ".icon.icon-search",
            "image_locator": ".card__media .motion-reduce",
            "url_locator": ".card__information a",
            "filter_results": False,
            "pop_up_check": False,
            "filter_check": False,
            "search_button_check": True,
            "excluded": False
        }

    ]


    all_websites = [
        Website(
            name=website.get('name'),
            url=website.get('url'),
            search_bar_locator=website.get('search_bar_locator'),
            header_locator=website.get('header_locator'),
            price_locator=website.get('price_locator'),
            pop_up_locator=website.get('pop_up_locator'),
            search_button_locator=website.get('search_button_locator'),
            image_locator=website.get('image_locator'),
            url_locator=website.get('url_locator'),
            filter_results=website.get('filter_results'),
            pop_up_check=website.get('pop_up_check', False),
            filter_check=website.get('filter_check', False),
            search_button_check=website.get('search_button_check', False),
            excluded=website.get('excluded', False)
        )
        for website in websites_data
    ]

    add_websites = [db.session.add(website) for website in all_websites]
    db.session.commit()


def undo_websites():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.websites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM websites"))
    db.session.commit()