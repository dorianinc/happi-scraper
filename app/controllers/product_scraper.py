import asyncio
import random
import traceback
# from app.models import db, Website, Match
from helpers import match_products
from playwright.async_api import async_playwright, expect
from playwright_stealth import stealth_async
# from .helpers import match_products, create_product, create_website, create_match


USER_AGENT_STRINGS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
]

# WEBSITE_CONFIGS = {
#     # "AAA Anime": {
#     #     "id": 1,
#     #     "url": "https://AAAanime.com",
#     #     "header_locator": None,
#     #     "price_locator": None,
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },
#     # "Amazon": {
#     #     "id": 2,
#     #     "url": "https://www.amazon.com",
#     #     "search_bar_locator": "input[name='field-keywords']",
#     #     "header_locator": ".a-size-base-plus.a-color-base.a-text-normal",
#     #     "price_locator": ".srp-results .s-item__price",
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },

#     "Big Bad Toy Store": {
#     "id": 3,
#     "url": "https://bigbadtoystore.com",
#     "search_bar_locator": "#searchbox1",
#     "header_locator": ".product-name",
#     "price_locator": None,
#     "pop_up_locator": None,
#     "search_button_locator": None,
#     "filter_results": False
# },

#     "Crunchyroll": {
#         "id": 4,
#         "url": "https://store.crunchyroll.com",
#         "search_bar_locator": "input[placeholder='Search apparel, figures, and more']",
#         "header_locator": ".pdp-link",
#         "price_locator": ".sales .value",
#         "pop_up_locator": None,
#         "search_button_locator": None,
#         "filter_results": False
#     },
#     # "eBay": {
#     #     "id": 5,
#     #     "url": "https://www.ebay.com",
#     #     "search_bar_locator": "input[placeholder='Search for anything']",
#     #     "header_locator": ".srp-results .s-item__title",
#     #     "price_locator": ".srp-results .s-item__price",
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },

#     # "Entertainment Earth": {
#     #     "id": 6,
#     #     "url": "https://entertainmentearth.com",
#     #     "header_locator": ".h4.item-name",
#     #     "price_locator": ".item-price",
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },
#     # "GK Figure Worldwide": {
#     #     "id": 7,
#     #     "url": "https://gkfigureworldwide.com",
#     #     "header_locator": None,
#     #     "price_locator": None,
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },
#     # "HLJ": {
#     #     "id": 8,
#     #     "url": "https://hlj.com",
#     #     "header_locator": None,
#     #     "price_locator": None,
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },

#     # "Japan Figure": {
#     #     "id": 9,
#     #     "url": "https://japan-figure.com",
#     #     "search_bar_locator": "input[placeholder='What are you looking for?']",
#     #     "header_locator": ".productitem--title",
#     #     "price_locator": ".price__current .money",
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },
#     # "Kotous": {
#     #     "id": 10,
#     #     "url": "https://kotous.com",
#     #     "search_bar_locator": "input[placeholder='Enter keywords to search...']",
#     #     "header_locator": ".product-item-link",
#     #     "price_locator": ".price-final_price .price",
#     #     "pop_up_locator": ".fancybox-close",
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },
#     # "Otaku Mode": {
#     #     "id": 11,
#     #     "url": "https://otakumode.com",
#     #     "search_bar_locator": "input[placeholder='Search Products...']",
#     #     "header_locator": ".p-product-list__title",
#     #     "price_locator": ".p-price__regular",
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },

#     # "Solaris Japan": {
#     #     "id": 12,
#     #     "url": "https://solarisjapan.com",
#     #     "header_locator": ".title",
#     #     "price_locator": ".product-submit__btn--red .money",
#     #     "pop_up_locator": None,
#     #     "search_button_locator": None,
#     #     "filter_results": False
#     # },

#     # "Super Anime Store": {
#     #     "id": 13,
#     #     "url": "https://Superanimestore.com",
#     #     "search_bar_locator": "#Search-In-Modal-1",
#     #     "header_locator": ".h5 .full-unstyled-link",
#     #     "price_locator": ".price-item--regular",
#     #     "pop_up_locator": ".privy-x",
#     #     "search_button_locator": ".icon.icon-search",
#     #     "filter_results": False
#     # }
# }

WEBSITE_CONFIGS = {
    # "Amazon": {
    #     "id": 2,
    #     "url": "https://www.amazon.com",
    #     "search_bar_locator": "input[name='field-keywords']",
    #     "header_locator": ".a-size-base-plus.a-color-base.a-text-normal",
    #     "price_locator": ".srp-results .s-item__price",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "image_locator": ".s-image-square-aspect .s-image",
    #     "url_locator": ".a-link-normal.s-no-outline",
    #     "filter_results": False
    # },
    # "Crunchyroll": {
    #     "id": 4,
    #     "url": "https://store.crunchyroll.com",
    #     "search_bar_locator": "input[placeholder='Search apparel, figures, and more']",
    #     "header_locator": ".pdp-link",
    #     "price_locator": ".sales .value",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "image_locator": ".tile-image",
    #     "url_locator": ".image-tile-container",
    #     "filter_results": False
    # },
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
    # "Japan Figure": {
    #     "id": 9,
    #     "url": "https://japan-figure.com",
    #     "search_bar_locator": "input[placeholder='What are you looking for?']",
    #     "header_locator": ".productitem--title",
    #     "price_locator": ".price__current .money",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "image_locator": ".productitem--image-primary",
    #     "url_locator": ".productitem--image-link",
    #     "filter_results": False
    # },
    # "Kotous": {
    #     "id": 10,
    #     "url": "https://kotous.com",
    #     "search_bar_locator": "input[placeholder='Enter keywords to search...']",
    #     "header_locator": ".product-item-link",
    #     "price_locator": ".price-final_price .price",
    #     # "pop_up_locator": ".fancybox-close",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "image_locator": ".product-image-photo",
    #     "url_locator": ".product-item-link",
    #     "filter_results": False
    # },
    # "Otaku Mode": {
    #     "id": 11,
    #     "url": "https://otakumode.com",
    #     "search_bar_locator": "input[placeholder='Search Products...']",
    #     "header_locator": ".p-product-list__title",
    #     "price_locator": ".p-price__regular",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "image_locator": ".p-product-list__item img",
    #     "url_locator": ".p-product-list__title",
    #     "filter_results": False
    # },
    # "Super Anime Store": {
    #     "id": 13,
    #     "url": "https://superanimestore.com",
    #     "search_bar_locator": "#Search-In-Modal-1",
    #     "header_locator": ".h5 .full-unstyled-link",
    #     "price_locator": ".price-item--regular",
    #     "pop_up_locator": ".privy-x",
    #     "search_button_locator": ".icon.icon-search",
    #     "image_locator": ".card__media .motion-reduce",
    #     "url_locator": ".card__information a",
    #     "filter_results": False
    # }
}


############################# SIMPLE HELPER FUNCTION #############################
async def close_pop_up(website_name, page):
    try:
        await asyncio.sleep(1) 
        await page.locator(WEBSITE_CONFIGS[website_name]["pop_up_locator"]).click()
    except Exception as error:
        print("Error in close_pop_up:\n")
        traceback.print_exc()


async def click_search_button(website_name, page):
    try:
        await page.locator(WEBSITE_CONFIGS[website_name]["search_button_locator"]).nth(0).click()
    except Exception as error:
        print("Error in click_search_button:\n")
        traceback.print_exc()

############################# FILTER/FIND FUNCTIONS #############################


async def filter_results(page):
    try:
        await page.locator("li").filter(has_text='Buy It Now').nth(3).click()
        await page.locator("#mainContent").get_by_role("button", name="Condition").click()
        await page.get_by_role("link", name="Any Condition - Filter Applied").click()
        await page.get_by_role("link", name="New", exact=True).click()
    except Exception as error:
        print("Error in filter_results:\n")
        traceback.print_exc()


async def find_matches(product_name, website_name, page, limit):
    try:
        match_count = 0
        header = page.locator(WEBSITE_CONFIGS[website_name]["header_locator"])
        await expect(header.nth(0)).to_be_visible()
        results_length = await header.count()
        print(f"{results_length} result(s) found {product_name} in {website_name}")
        if results_length < limit:
            limit = results_length
        for index in range(limit):
            # print(f"==>> index: {index}")
            website_product_name = await header.nth(index).inner_text()
            if match_products(product_name, website_product_name):
                match_count += 1
                # create_match(page, index)
                img_src = await get_image(website_name, page, index)
                price = await get_price(website_name, page, index)
                url = await get_url(website_name, page, index)
                print("product: ", website_product_name)
                print("price: ", price)
                print("img_src:", img_src)
                print("url: ", url + "\n")
        print(f"{match_count} match(es) were found \n")
    except Exception as error:
        print(f"No results found for {product_name} in {website_name}")
        traceback.print_exc()

############################# GET FUNCTIONS #############################


async def get_price(website_name, page, index):
    print("Getting prices...")
    if website_name == "Amazon":
        dollar = page.locator(".a-price-whole").nth(index)
        dollar_text = await dollar.inner_text()
        dollar_text = dollar_text.strip()
        dollar_text = dollar_text.replace('\n', '')

        cent = page.locator(".a-price-fraction").nth(index)
        cent_text = await cent.inner_text()
        cent_text = cent_text.strip()
        price = float(f"{dollar_text}{cent_text}")

    elif website_name == "Big Bad Toy Store":
        dollar = page.locator(".price-integer").nth(index)
        dollar_text = await dollar.inner_text()
        dollar_text = dollar_text.strip()

        cent = page.locator(".price-decimal").nth(index)
        cent_text = await cent.inner_text()
        cent_text = cent_text.strip()
        price = float(f"{dollar_text}.{cent_text}")

    else:
        price_element = page.locator(
            WEBSITE_CONFIGS[website_name]["price_locator"]).nth(index)
        price_text = await price_element.inner_text()
        price = float(price_text.strip().replace("$", ""))
    return price


async def get_image(website_name, page, index):
    # print("image index: ", index)
    try:
        print("Getting image...")
        image = page.locator(WEBSITE_CONFIGS[website_name]["image_locator"]).nth(index)
        img_src = await image.get_attribute('src')
        if website_name == "Super Anime Store":
            img_src = "https:" + img_src
        return img_src
    except Exception as error:
        print("Error in get_image:\n")
        traceback.print_exc()
        
async def get_url(website_name, page, index):
    # print("url index: ", index)
    try:
        print("Getting url...")
        link = page.locator(WEBSITE_CONFIGS[website_name]["url_locator"]).nth(index)
        url = await link.get_attribute('href')
        # print(f"==>> url before: {url}")
        
        if not url.startswith('http://') and not url.startswith('https://'):
            url = WEBSITE_CONFIGS[website_name]["url"] + url
            # print(f"==>> url after: {url}")
        return url
    except Exception as error:
        print("Error in get_url:\n")
        traceback.print_exc()


############################# MAIN FUNCTIONS #############################
async def get_page(website_url, p):
    print("Getting page...")
    user_agents = USER_AGENT_STRINGS[random.randint(
        0, len(USER_AGENT_STRINGS) - 1)]
    browser = await p.chromium.launch(headless=False, slow_mo=500)
    context = await browser.new_context(user_agent=user_agents)
    await context.add_init_script("delete Object.getPrototypeOf(navigator).webdriver")
    page = await context.new_page()
    await page.add_init_script("delete Object.getPrototypeOf(navigator).webdriver")
    await stealth_async(page)
    await page.goto(website_url)
    return page


async def scrape_website(product_name, website_name, limit):
    async with async_playwright() as p:
        page = await get_page(WEBSITE_CONFIGS[website_name]["url"], p)

        try:
            if WEBSITE_CONFIGS[website_name]["pop_up_locator"]:
                await close_pop_up(website_name, page)
            if WEBSITE_CONFIGS[website_name]["search_button_locator"]:
                await click_search_button(website_name, page)

            await page.locator(WEBSITE_CONFIGS[website_name]["search_bar_locator"]).fill(product_name)
            await page.keyboard.press("Enter")
            await asyncio.sleep(1.5) 

            if WEBSITE_CONFIGS[website_name]["filter_results"]:
                filter_results(page)

            await find_matches(product_name, website_name, page, limit)
        except Exception as error:
            print(f"Error scraping {website_name}:\n")
            traceback.print_exc()


async def main(product_name):
    tasks = []
    for website_name, config in WEBSITE_CONFIGS.items():
        tasks.append(scrape_website(product_name, website_name, 5))
    await asyncio.gather(*tasks)


asyncio.run(main("Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan)"))
