import asyncio
import random
# from app.models import db, Website, Match
from helpers import match_products
from playwright.async_api import async_playwright, expect
from playwright_stealth import stealth_async
# from .helpers import match_products, create_product, create_website, create_match


user_agent_strings = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
]

def switch(name):
    query = {}
    if name == "Amazon":
        query["header_locator"] = ".a-size-base-plus.a-color-base.a-text-normal"
        query["price_locator"] = ".srp-results .s-item__price"
        return query
    elif name == "Crunchyroll":
        query["header_locator"] = ".pdp-link"
        query["price_locator"] = ".sales .value"
        return query
    elif name == "Ebay":
        query["header_locator"] = ".srp-results .s-item__title"
        query["price_locator"] = ".srp-results .s-item__price"
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
    except Exception as e:
        print("Was not able to filter results")
        print("error: ", e)
        



async def filter_matches(product_name, page, name, limit):
    print("=====> filtering for matches <======")
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
        print("")
                
    except AssertionError:
        print("No results found")


async def create_match(page, index, locator):
    price = get_price(page, index, locator)


async def get_page(p, website):
    user_agents = user_agent_strings[random.randint(0, len(user_agent_strings) - 1)]
    browser = await p.chromium.launch(headless=False, slow_mo=1000)
    context = await browser.new_context(user_agent=user_agents)
    await context.add_init_script("delete Object.getPrototypeOf(navigator).webdriver")
    page = await context.new_page()
    await stealth_async(page)
    await page.add_init_script("delete Object.getPrototypeOf(navigator).webdriver")
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


# async def scrape_amazon(product_name, limit):
#     async with async_playwright() as p:
#         name = "Amazon"
#         url = "https://www.amazon.com"
#         counter = 0
#         page = await get_page(p, url)
#         try:
#             await page.locator("input[name='field-keywords']").fill(product_name)
#             await page.keyboard.press("Enter")
#         except Exception as e:
#             print("Input field was not found")

#         try:
#             header = page.locator(
#                 ".a-size-base-plus.a-color-base.a-text-normal")
#             await expect(header.nth(0)).to_be_visible()
#             for i in range(limit):
#                 name = await header.nth(i).inner_text()

#                 if match_products(product_name, name):
#                     image = await get_image(page, i)
#                     price = await get_price(page, i)
#                     match = create_match(name, image, price)
#                     website["matches"].append(match)
#                     counter += 1
#         except AssertionError:
#             print("No results found")

async def scrape_crunchyroll(product_name, limit):
    async with async_playwright() as p:
        name = "Crunchyroll"
        url = "https://store.crunchyroll.com"
        page = await get_page(p, url)

        try:
            # if input field is found...
            await page.locator(".form-control.search-field").fill(product_name)
            await page.keyboard.press("Enter")
            result = await filter_matches(product_name, page, ".pdp-link", limit)
            return result
        except Exception as e:
            # else if no input field
            print("Input field was not found")


async def scrape_ebay(product_name, limit):
    async with async_playwright() as p:
        site_name = "Ebay"
        url = "https://eBay.com"
        page = await get_page(p, url)
        
        try:
            await page.get_by_placeholder("Search for anything").fill(product_name)
            await page.keyboard.press("Enter")
            await filter_results(page) 
            await filter_matches(product_name, page, site_name, limit)
        except Exception as e:
            print("Input field was not found")


# async def scrape_websites(website):
#     async with async_playwright() as p:
#         counter = 0
#         page = await get_page(p, website["url"])


# async def find_matches(product_name, product_id):
#     websites = getWebsites()
#     results = {}
#     for i in range(websites.len()):
#         website = websites[i]

async def main(product_name):
    # results = await scrape_crunchyroll(product_name, 2)
    results = await scrape_ebay(product_name, 2)
    print(f"==>> results: {results}")

asyncio.run(main(
    "Banpresto Dragon Ball Z Solid Edge Works vol.5(A:Super Saiyan 2 Son Gohan)"))
