import asyncio
import random
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

WEBSITE_CONFIGS = {
    # "AAA Anime": {
    #     "id": 1,
    #     "url": "https://AAAanime.com",
    #     "header_locator": None,
    #     "price_locator": None,
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "filter_results": False
    # },
    # "Amazon": {
    #     "id": 2,
    #     "url": "https://www.amazon.com",
    #     "search_bar_locator": "input[name='field-keywords']",
    #     "header_locator": ".a-size-base-plus.a-color-base.a-text-normal",
    #     "price_locator": ".srp-results .s-item__price",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "filter_results": False
    # },

    # "Big Bad Toy Store": {
    #     "id": 3,
    #     "url": "https://bigbadtoystore.com",
    #     "header_locator": None,
    #     "price_locator": None,
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
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
    #     "filter_results": False
    # },
    # "eBay": {
    #     "id": 5,
    #     "url": "https://www.ebay.com",
    #     "search_bar_locator": "input[placeholder='Search for anything']",
    #     "header_locator": ".srp-results .s-item__title",
    #     "price_locator": ".srp-results .s-item__price",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "filter_results": False
    # },

    # "Entertainment Earth": {
    #     "id": 6,
    #     "url": "https://entertainmentearth.com",
    #     "header_locator": ".h4.item-name",
    #     "price_locator": ".item-price",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "filter_results": False
    # },
    # "GK Figure Worldwide": {
    #     "id": 7,
    #     "url": "https://gkfigureworldwide.com",
    #     "header_locator": None,
    #     "price_locator": None,
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "filter_results": False
    # },
    # "HLJ": {
    #     "id": 8,
    #     "url": "https://hlj.com",
    #     "header_locator": None,
    #     "price_locator": None,
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "filter_results": False
    # },

    # "Japan Figure": {
    #     "id": 9,
    #     "url": "https://japan-figure.com",
    #     "search_bar_locator": "input[placeholder='What are you looking for?']",
    #     "header_locator": ".productitem--title",
    #     "price_locator": ".price__current .money",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "filter_results": False
    # },
    # "Kotous": {
    #     "id": 10,
    #     "url": "https://kotous.com",
    #     "search_bar_locator": "input[placeholder='Enter keywords to search...']",
    #     "header_locator": ".product-item-link",
    #     "price_locator": ".price-final_price .price",
    #     "pop_up_locator": ".fancybox-close",
    #     "search_button_locator": None,
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
    #     "filter_results": False
    # },

    # "Solaris Japan": {
    #     "id": 12,
    #     "url": "https://solarisjapan.com",
    #     "header_locator": ".title",
    #     "price_locator": ".product-submit__btn--red .money",
    #     "pop_up_locator": None,
    #     "search_button_locator": None,
    #     "filter_results": False
    # },

    "Super Anime Store": {
        "id": 13,
        "url": "https://Superanimestore.com",
        "search_bar_locator": "#Search-In-Modal-1",
        "header_locator": ".h5 .full-unstyled-link",
        "price_locator": ".price-item--regular",
        "pop_up_locator": ".privy-x",
        "search_button_locator": ".icon.icon-search",
        "filter_results": False
    }
}


def switch(name):
    query = {}
    if name == "Amazon":
        query["header_locator"] = ".a-size-base-plus.a-color-base.a-text-normal"
        query["price_locator"] = ".srp-results .s-item__price"
    elif name == "Crunchyroll":
        query["header_locator"] = ".pdp-link"
        query["price_locator"] = ".sales .value"
    elif name == "Ebay":
        query["header_locator"] = ".srp-results .s-item__title"
        query["price_locator"] = ".srp-results .s-item__price"
    elif name == "Super Anime Store":
        query["header_locator"] = ".h5 .full-unstyled-link"
        query["price_locator"] = ".price-item--regular"
    elif name == "Entertainment Earth":
        query["header_locator"] = ".h4.item-name"
        query["price_locator"] = ".item-price"
    elif name == "Otaku Mode":
        query["header_locator"] = ".p-product-list__title"
        query["price_locator"] = ".p-price__regular"
    elif name == "Solaris Japan":
        query["header_locator"] = ".title"
        query["price_locator"] = ".product-submit__btn--red .money"
    elif name == "Japan Figure":
        query["header_locator"] = ".productitem--title"
        query["price_locator"] = ".price__current .money"
    elif name == "Kotous":
        query["header_locator"] = ".product-item-link"
        query["price_locator"] = ".price-final_price .price"
    elif name == "AAA Anime":
        query["header_locator"] = "header_locator_for_AAA_Anime"
        query["price_locator"] = "price_locator_for_AAA_Anime"
    elif name == "HLJ":
        query["header_locator"] = "header_locator_for_HLJ"
        query["price_locator"] = "price_locator_for_HLJ"
    elif name == "Big Bad Toy Store":
        query["header_locator"] = "header_locator_for_Big_Bad_Toy_Store"
        query["price_locator"] = "price_locator_for_Big_Bad_Toy_Store"
    return query


async def filter_results(page):
    try:
        await page.locator("li").filter(has_text='Buy It Now').nth(3).click()
        await page.locator("#mainContent").get_by_role("button", name="Condition").click()
        await page.get_by_role("link", name="Any Condition - Filter Applied").click()
        await page.get_by_role("link", name="New", exact=True).click()
    except Exception as error:
        print("Error in filter_results:\n")
        print(error)

# not basic


async def close_pop_up(page, website_name):
    try:
        await asyncio.sleep(1)  # special condition
        # special condition
        await page.locator(WEBSITE_CONFIGS[website_name]["pop_up_locator"]).click()
    except Exception as error:
        print("Error closing pop-up:\n")
        print(error)

# not basic


async def click_search_button(page, website_name):
    try:
        # special condition
        await page.locator(WEBSITE_CONFIGS[website_name]["search_button_locator"]).nth(0).click()
    except Exception as error:
        print("Error clicking search button:\n")
        print(error)


# async def filter_matches(product_name, page, name, limit):
#     try:
#         query = switch(name)
#         header = page.locator(query["header_locator"])
#         if await expect(header.nth(0)).to_be_visible() == None:
#             results_length = await header.count()
#             if results_length < limit:
#                 limit = results_length
#             for index in range(limit):
#                 name = await header.nth(0).inner_text()
#                 if match_products(product_name, name):
#                     # create_match(page, index)
#                     # image = await get_image(page, i)
#                     price = await get_price(page, index, query["price_locator"])
#         else:
#             print("No results found")
#     except Exception as error:
#         print("Error in filter_matches: \n")
#         print(error)


async def filter_matches(product_name, page, website_name, limit):
    try:
        header = page.locator(WEBSITE_CONFIGS[website_name]["header_locator"])
        if await expect(header.nth(0)).to_be_visible() == None:
            results_length = await header.count()
            if results_length < limit:
                limit = results_length
            for index in range(limit):
                name = await header.nth(0).inner_text()
                if match_products(product_name, name):
                    # create_match(page, index)
                    # image = await get_image(page, i)
                    price = await get_price(page, index, WEBSITE_CONFIGS[website_name]["price_locator"])
        else:
            print("No results found")
    except Exception as error:
        print("Error in filter_matches: \n")
        print(error)


async def create_match(page, index, locator):
    price = get_price(page, index, locator)


async def get_page(p, website):
    user_agents = USER_AGENT_STRINGS[random.randint(
        0, len(USER_AGENT_STRINGS) - 1)]
    browser = await p.chromium.launch(headless=False, slow_mo=1000)
    context = await browser.new_context(user_agent=user_agents)
    await context.add_init_script("delete Object.getPrototypeOf(navigator).webdriver")
    page = await context.new_page()
    # await page.add_init_script("delete Object.getPrototypeOf(navigator).webdriver")
    await stealth_async(page)
    await page.goto(website)
    return page


async def get_amazon_price(page, i):
    dollar = page.locator(".a-price-whole").nth(i)
    dollar_text = await dollar.inner_text()
    cent = page.locator(".a-price-fraction").nth(i)
    cent_text = await cent.inner_text()
    return float(f"{dollar_text}{cent_text}")


async def get_price(page, i, locator):
    price_element = page.locator(locator).nth(i)
    price_text = await price_element.inner_text()
    price_washed = float(price_text.strip().replace("$", ""))
    print(f"==>> price_washed: {price_washed}")
    return price_washed


async def get_image(page, i):
    image = page.locator(".s-image-square-aspect .s-image").nth(i)
    return await image.evaluate('(element) => element.src')

 # basic up until the whole price part where cents are separated from dollars


async def scrape_amazon(product_name, limit):
    async with async_playwright() as p:
        name = "Amazon"
        url = "https://www.amazon.com"
        counter = 0
        page = await get_page(p, url)
        try:
            await page.locator("input[name='field-keywords']").fill(product_name)
            await page.keyboard.press("Enter")
        except Exception as error:
            print("Input field was not found")

        try:
            header = page.locator(
                ".a-size-base-plus.a-color-base.a-text-normal")
            await expect(header.nth(0)).to_be_visible()
            for i in range(limit):
                name = await header.nth(i).inner_text()

                if match_products(product_name, name):
                    image = await get_image(page, i)
                    price = await get_price(page, i)
                    match = create_match(name, image, price)
                    website["matches"].append(match)
                    counter += 1
        except AssertionError:
            print("No results found")


async def scrape_website(product_name, website_name, limit):
    async with async_playwright() as p:
        page = await get_page(p, WEBSITE_CONFIGS[website_name]["url"])

        try:
            if WEBSITE_CONFIGS[website_name]["pop_up_locator"]:
                await close_pop_up(page, website_name)

            if WEBSITE_CONFIGS[website_name]["search_button_locator"]:
                # special condition
                await page.locator(".icon.icon-search").nth(0).click()

            await page.locator(WEBSITE_CONFIGS[website_name]["search_bar_locator"]).fill(product_name)
            await page.keyboard.press("Enter")

            if WEBSITE_CONFIGS[website_name]["filter_results"]:
                filter_results(page)

            await filter_matches(product_name, page, website_name, limit)
        except Exception as error:
            print(f"Error scraping {website_name} \n")
            print(error)

# async def main(product_name):

    # await scrape_amazon(product_name, 2) ## working with old format

    # await scrape_crunchyroll(product_name, 2)  # working
    # await scrape_ebay(product_name, 2) ## working
    # await scrape_superanimestore(product_name, 2) ## working
    # await scrape_otaku_mode(product_name, 2) ## working
    # await scrape_japan_figure(product_name, 2) ## working
    # await scrape_kotous(product_name, 2) ## working

    # await scrape_entertainment_earth(product_name, 2) ## NOT WORKING
    # await scrape_solaris_japan(product_name, 2) ## NOT WORKING


# asyncio.run(main(
# "Banpresto Dragon Ball Z Solid Edge Works vol.5(A:Super Saiyan 2 Son Gohan)"))


async def main(product_name):
    product_name = "Chainsaw Man Aki Hayakawa 1/7 Scale Figure"  # for otaku mode
    # for japan figures
    product_name = "Dragon Ball Z Banpresto Solid Edge Works Departure 12 Super Saiyan 2 Son Gohan"
    product_name = "ARTFX J SATORU GOJO JUJUTSU KAISEN 0 VER."  # for kotous
    product_name = "ONE PIECE - LUFFY PLUSH 8''"  # for super store
    tasks = []
    for website_name, config in WEBSITE_CONFIGS.items():
        tasks.append(scrape_website(product_name, website_name, 2))
    await asyncio.gather(*tasks)

asyncio.run(main(
    "Banpresto Dragon Ball Z Solid Edge Works vol.5(A:Super Saiyan 2 Son Gohan)"))
