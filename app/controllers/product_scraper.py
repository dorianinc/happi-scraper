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

WEBSITE_CONFIG = {
    "Amazon": {
        "url": "https://www.amazon.com",
        "header_locator": ".a-size-base-plus.a-color-base.a-text-normal",
        "price_locator": ".srp-results .s-item__price"
    },
    "Crunchyroll": {
        "url": "https://store.crunchyroll.com",
        "header_locator": ".pdp-link",
        "price_locator": ".sales .value"
    },
    "Ebay": {
        "url": "https://www.ebay.com",
        "header_locator": ".srp-results .s-item__title",
        "price_locator": ".srp-results .s-item__price"
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
    return query

# def getWebsites():
#     websites = Website.query.all()
#     print("websites_dict ==>", [website.to_dict() for website in websites])
#     return [website.to_dict() for website in websites]


async def filter_results(page):
    try:
        await page.locator("li").filter(has_text='Buy It Now').nth(3).click()
        await page.locator("#mainContent").get_by_role("button", name="Condition").click()
        await page.get_by_role("link", name="Any Condition - Filter Applied").click()
        await page.get_by_role("link", name="New", exact=True).click()
    except Exception as error:
        print("Error in filter_results:\n")
        print(error)


async def filter_matches(product_name, page, name, limit):
    try:
        query = switch(name)
        header = page.locator(query["header_locator"])
        await expect(header.nth(0)).to_be_visible()
        results_length = await header.count()
        if results_length < limit:
            limit = results_length
        for index in range(limit):
            name = await header.nth(0).inner_text()
            if match_products(product_name, name):
                # create_match(page, index)
                # image = await get_image(page, i)
                price = await get_price(page, index, query["price_locator"])
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

# basic bitch


async def scrape_crunchyroll(product_name, limit):
    async with async_playwright() as p:
        site_name = "Crunchyroll"
        url = "https://store.crunchyroll.com"
        page = await get_page(p, url)

        try:
            await page.locator("input[placeholder='Search apparel, figures, and more']").fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Crunchyroll: \n")
            print(error)

# not basic


async def scrape_ebay(product_name, limit):
    async with async_playwright() as p:
        site_name = "Ebay"
        url = "https://eBay.com"
        page = await get_page(p, url)

        try:
            await page.locator("input[placeholder='Search for anything']").fill(product_name)
            await page.keyboard.press("Enter")

            await filter_results(page)  # special condition

            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Ebay: \n")
            print(error)

# not basic


async def scrape_superanimestore(product_name, limit):
    async with async_playwright() as p:
        site_name = "Super Anime Store"
        url = "https://superanimestore.com"
        product_name = "ONE PIECE - LUFFY PLUSH 8''"
        page = await get_page(p, url)

        try:
            await asyncio.sleep(2)  # special condition
            await page.locator(".privy-x").click()  # special condition
            # special condition
            await page.locator(".icon.icon-search").nth(0).click()

            await page.locator("#Search-In-Modal-1").fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Super Anime Store: \n")
            print(error)

# basic bitch


########## HAVE AN ISSUE WITH THE MODAL (DIALOG BOX) BLOCKING PROGRESS INTO SITE
async def scrape_entertainment_earth(product_name, limit):
    async with async_playwright() as p:
        site_name = "Entertainment Earth"
        url = "https://www.entertainmentearth.com/s/newly-added"
        product_name = "ONE PIECE - LUFFY PLUSH 8''"
        page = await get_page(p, url)

        # page.on("dialog", lambda dialog: dialog.dismiss())
        # await page.get_by_role("button").click()
        # await page.locator("#dialogContainer").click()
        # await page.locator(".css-woxaoh").click()
        # await page.locator("#overlayContainer").click()
        await page.locator("#input0label").fill("go fuck yourself")
        
        try:
            await page.locator("#input0label").nth(0).fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Entertainment Earth: \n")
            print(error)

async def scrape_otaku_mode(product_name, limit):
    async with async_playwright() as p:
        site_name = "Otaku Mode"
        url = "https://otakumode.com"
        product_name = "Chainsaw Man Aki Hayakawa 1/7 Scale Figure"
        page = await get_page(p, url)

        try:
            await page.locator("input[placeholder='Search Products...']").fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Otaku Mode: \n")
            print(error)

# basic bitch
async def scrape_solaris_japan(product_name, limit):
    async with async_playwright() as p:
        site_name = "Solaris Japan"
        url = "https://solarisjapan.com"
        product_name = "Jujutsu Kaisen Dai 2 Ki - Fushiguro Touji - Jurei (Bukiko) - Luminasta - Rinsen (SEGA)"
        page = await get_page(p, url)

        try:
            await page.locator("input[placeholder='Search a product']").nth(0).click()
            await page.locator("input[placeholder='Search a product']").nth(0).fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Solaris Japan: \n")
            print(error)


# basic bitch
async def scrape_japan_figure(product_name, limit):
    async with async_playwright() as p:
        site_name = "Japan Figure"
        url = "https://japan-figure.com"
        product_name = "Dragon Ball Z Banpresto Solid Edge Works Departure 12 Super Saiyan 2 Son Gohan"
        page = await get_page(p, url)

        try:
            await page.locator(".needsclick .klaviyo-close-form").nth(0).click()
            await page.locator("input[placeholder='What are you looking for?']").fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Japan Figure: \n")
            print(error)

# not basic
async def scrape_kotous(product_name, limit):
    async with async_playwright() as p:
        site_name = "Kotous"
        url = "https://kotous.com"
        product_name = "ARTFX J SATORU GOJO JUJUTSU KAISEN 0 VER."
        page = await get_page(p, url)

        try:
            # special condition
            await page.get_by_role("link", name="Close").nth(1).click()
            await page.locator("input[placeholder='Enter keywords to search...']").fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Kotous: \n")
            print(error)


# async def scrape_websites(website):
#     async with async_playwright() as p:
#         counter = 0
#         page = await get_page(p, website["url"])


async def find_matches(product_name, product_id):
    websites = getWebsites()
    results = {}
    for i in range(websites.len()):
        website = websites[i]


async def main(product_name):
    
    # await scrape_amazon(product_name, 2) ## working with old format
    
    # await scrape_crunchyroll(product_name, 2) ## working
    # await scrape_ebay(product_name, 2) ## working
    # await scrape_superanimestore(product_name, 2) ## working
    # await scrape_otaku_mode(product_name, 2) ## working
    # await scrape_japan_figure(product_name, 2) ## working
    # await scrape_kotous(product_name, 2) ## working
    
    await scrape_entertainment_earth(product_name, 2) ## NOT WORKING
    # await scrape_solaris_japan(product_name, 2) ## NOT WORKING 

    
    
    
    

asyncio.run(main(
"Banpresto Dragon Ball Z Solid Edge Works vol.5(A:Super Saiyan 2 Son Gohan)"))


# async def main(product_name):
#     tasks = []
#     for website_name, config in WEBSITE_CONFIG.items():
#         tasks.append(scrape_website(product_name, website_name, config["url"], 2))
#     await asyncio.gather(*tasks)

# asyncio.run(main("Banpresto Dragon Ball Z Solid Edge Works vol.5(A:Super Saiyan 2 Son Gohan)"))
