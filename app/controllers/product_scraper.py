import asyncio
# from app.models import db, Website, Match
from playwright.async_api import async_playwright, expect
from helpers import match_products
# from .helpers import match_products, create_product, create_website, create_match


# def getWebsites():
#     websites = Website.query.all()
#     print("websites_dict ==>", [website.to_dict() for website in websites])
#     return [website.to_dict() for website in websites]

async def create_match(page, index, locator):
    price = get_price(page, index, locator)
    

async def get_page(p, website):
    browser = await p.chromium.launch(headless=False, slow_mo=1000)
    context = await browser.new_context()
    page = await context.new_page()
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
    print("dsdf =>", price_text.strip().replace("$", ""))
    return float(price_text.strip().replace("$", ""))


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
        url = "https://store.crunchyroll.com"
        page = await get_page(p, url)

        try:
            await page.locator(".form-control.search-field").fill(product_name)
            await page.keyboard.press("Enter")
        except Exception as e:
            print("Input field was not found")

        try:
            header = page.locator(".pdp-link")
            await expect(header.nth(0)).to_be_visible()
            for index in range(limit):
                name = await header.nth(index).inner_text()

                if match_products(product_name, name):
                    # create_match(page, index)
                    # image = await get_image(page, i)
                    price = await get_price(page, index, ".sales .value")
                    return price
        except AssertionError:
            print("No results found")
            
            
async def get_ebay_price(product_name):
    async with async_playwright() as p:
        url = "https://eBay.com"
        page = await get_page(p, url)
        
        try:
            await page.locator("#gh-ac").fill(product_name)
            await page.keyboard.press("Enter")
        except Exception as e:
            print("Input field was not found")
        
        try:
            await page.locator("li").filter({'has_text': 'Buy It Now'}).nth(3).click()
            await page.locator("#mainContent").get_by_role("button", name="Condition").click()
            await page.get_by_role("link", name="Any Condition - Filter Applied").click()
            await page.get_by_role("link", name="New", exact=True).click()
        except Exception as e:
            print("Was not able to filter results")

        title = ""
        while True:
            header = await page.locator(".srp-results .s-item__title").nth(item_index)
            title = await header.text()

            if helpers.match_products(product_name, title):
                price = await page.locator(".srp-results .s-item__price").nth(item_index)
                price_text = await price.text()
                return float(price_text.strip().replace("$", ""))
            else:
                item_index += 1

            
            
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
    results = await scrape_crunchyroll(product_name, 1)
    print(f"==>> results: {results}")
    
asyncio.run(main("Banpresto Dragon Ball Z Solid Edge Works vol.5(A:Super Saiyan 2 Son Gohan)"))