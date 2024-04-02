import asyncio
import random
import traceback
from app.models import db, Website, Match, Setting
from .helpers import match_products
from .website_data import WEBSITE_CONFIGS
from playwright.async_api import async_playwright, expect
from playwright_stealth import stealth_async

USER_AGENT_STRINGS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
]

############################# SIMPLE HELPER FUNCTION #############################


async def close_pop_up(website, page):
    try:
        await asyncio.sleep(1)
        await page.locator(website["pop_up_locator"]).click()
    except Exception as error:
        print("Error in close_pop_up:\n")
        traceback.print_exc()


async def click_search_button(website, page):
    try:
        await page.locator(website["search_button_locator"]).nth(0).click()
    except Exception as error:
        print("Error in click_search_button:\n")
        traceback.print_exc()


def calculate_average(prices):
    total = sum(prices)
    average = total / len(prices)
    return round(average, 2)


def flatten(array):
    flattened_array = []
    for subarray in array:
        if subarray is not None:
            for element in subarray:
                flattened_array.append(element)
    if len(flattened_array) > 0:
        return flattened_array
    else:
        return None

############################# FILTER FUNCTIONS #############################


async def filter_results(page):
    try:
        await page.locator("li").filter(has_text='Buy It Now').nth(3).click()
        await page.locator("#mainContent").get_by_role("button", name="Condition").click()
        await page.get_by_role("link", name="Any Condition - Filter Applied").click()
        await page.get_by_role("link", name="New", exact=True).click()
    except Exception as error:
        print("Error in filter_results:\n")
        traceback.print_exc()


async def filter_matches(product, website, page, settings):
    prices = []
    match_found = False
    try:
        header = page.locator(website["header_locator"])
        await expect(header.nth(0)).to_be_visible()
        results_length = await header.count()
        limit = min(results_length, settings["filter_limit"])

        for index in range(limit):
            website_product_name = await header.nth(index).inner_text()
            similarity_rating = match_products(
                product["name"], website_product_name)
            if similarity_rating > settings["similarity_threshold"]:
                match_found = True
                price = await get_price(website, page, index)
                prices.append(price)
                match = Match(
                    name=website_product_name,
                    img_src=await get_image(website, page, index),
                    url=await get_url(website, page, index),
                    price=price,
                    website_name=website["name"],
                    similarity_rating=similarity_rating,
                    website_id=website["id"],
                    product_id=product["id"]
                )
                db.session.add(match)
                db.session.commit()
        if match_found:
            return prices
    except Exception as error:
        print(f"No results found for {product['name']} in {website['name']}")
        traceback.print_exc()

############################# GET FUNCTIONS #############################


async def get_price(website, page, index):
    if website["name"] == "Amazon":
        dollar = page.locator(".a-price-whole").nth(index)
        dollar_text = await dollar.inner_text()
        dollar_text = dollar_text.strip()
        dollar_text = dollar_text.replace('\n', '')

        cent = page.locator(".a-price-fraction").nth(index)
        cent_text = await cent.inner_text()
        cent_text = cent_text.strip()
        price = float(f"{dollar_text}{cent_text}")

    elif website["name"] == "Big Bad Toy Store":
        dollar = page.locator(".price-integer").nth(index)
        dollar_text = await dollar.inner_text()
        dollar_text = dollar_text.strip()

        cent = page.locator(".price-decimal").nth(index)
        cent_text = await cent.inner_text()
        cent_text = cent_text.strip()
        price = float(f"{dollar_text}.{cent_text}")

    else:
        price_element = page.locator(
            website["price_locator"]).nth(index)
        price_text = await price_element.inner_text()
        price = float(price_text.strip().replace("$", ""))
    return price


async def get_image(website, page, index):
    try:
        image = page.locator(
            website["image_locator"]).nth(index)
        img_src = await image.get_attribute('src')
        if website["name"] == "Super Anime Store":
            img_src = "https:" + img_src
        return img_src
    except Exception as error:
        print("Error in get_image:\n")
        traceback.print_exc()


async def get_url(website, page, index):
    try:
        link = page.locator(
            website["url_locator"]).nth(index)
        url = await link.get_attribute('href')
        if not url.startswith('http://') and not url.startswith('https://'):
            url = website["url"] + url
        return url
    except Exception as error:
        print("Error in get_url:\n")
        traceback.print_exc()


############################# MAIN FUNCTIONS #############################
async def get_page(url, p):
    # print("Getting page...")
    user_agents = USER_AGENT_STRINGS[random.randint(
        0, len(USER_AGENT_STRINGS) - 1)]
    browser = await p.chromium.launch(headless=True, slow_mo=500)
    context = await browser.new_context(user_agent=user_agents)
    await context.add_init_script("delete Object.getPrototypeOf(navigator).webdriver")
    page = await context.new_page()
    await page.add_init_script("delete Object.getPrototypeOf(navigator).webdriver")
    await stealth_async(page)
    await page.goto(url)
    return page


async def scrape_website(product, website, settings):
    async with async_playwright() as p:
        page = await get_page(website["url"], p)

        try:
            if website["pop_up_check"]:
                await close_pop_up(website, page)
            if website["search_button_check"]:
                await click_search_button(website, page)

            await page.locator(website["search_bar_locator"]).fill(product["name"])
            await page.keyboard.press("Enter")

            if website["filter_check"]:
                await filter_results(page)

            return await filter_matches(product, website, page, settings)
        except Exception as error:
            print(f"Error scraping {website['name']}:\n")
            traceback.print_exc()


async def create_match(product, websites, settings):
    tasks = []
    results = []
    for website in websites:
        if not website["excluded"]:
            tasks.append(scrape_website(product.to_dict(), website, settings))
    results = await asyncio.gather(*tasks)
    all_prices = flatten(results)
    if all_prices:
        avg_price = calculate_average(all_prices)
        return avg_price
    else:
        return None


