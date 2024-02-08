import asyncio
from models.website import Website
from playwright.async_api import async_playwright, expect
from helpers import match_products, create_product, create_website, create_match


async def get_page(p, website):
    browser = await p.chromium.launch(headless=False)
    context = await browser.new_context()
    page = await context.new_page()
    await page.goto(website)
    return page


async def get_price(page, i):
    dollar = page.locator(".a-price-whole").nth(i)
    dollar_text = await dollar.text_content()
    cent = page.locator(".a-price-fraction").nth(i)
    cent_text = await cent.text_content()
    return float(f"{dollar_text}{cent_text}")


async def get_image(page, i):
    image = page.locator(".s-image-square-aspect .s-image").nth(i)
    return await image.evaluate('(element) => element.src')


async def scrape_amazon(product_name, limit):
    async with async_playwright() as p:
        name = "Amazon"
        url = "https://www.amazon.com"
        website = create_website(name, url)
        counter = 0
        page = await get_page(p, url)
        try:
            await page.locator("input[name='field-keywords']").fill(product_name)
            await page.keyboard.press("Enter")
        except Exception as e:
            print("Input field was not found")

        try:
            header = page.locator(
                ".a-size-base-plus.a-color-base.a-text-normal")
            await expect(header.nth(0)).to_be_visible()
            for i in range(limit):
                name = await header.nth(i).text_content()

                if match_products(product_name, name):
                    counter += 1
                    price = await get_price(page, i)
                    image = await get_image(page, i)
                    match = {
                    "name": name,
                    "img_src": image,
                    "price": price,
                    "url": None,
                    }
                    website["matches"].append(match)
            if counter > 0:
                return website
            else: return None
        except AssertionError:
            print("No results found")


async def main(product_name):
    product = create_product(product_name)
    amazon_results = await scrape_amazon(product_name, 5)
    product["websites"].append(amazon_results)
    print(f"==>> product: {product}")

asyncio.run(main(
    "Banpresto Dragon Ball Z Solid Edge Works vol.5(A:Super Saiyan 2 Son Gohan)"))
