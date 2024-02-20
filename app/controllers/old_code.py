########### UNDER CONSTRUCTION #########
async def get_hlj_price(product_name):
    item_index = 0
    page = await get_page("https://hlj.com")
    product_name = "ZOIDS x Monster Hunter - Beast Liger Sinister Armor"

    try:
        await page.locator("#search").fill(product_name)
        await page.keyboard.press("Enter")
    except Exception as e:
        print("error 👉", e)

    title = ""
    while True:
        header = await page.locator(".product-item-name").nth(item_index)
        title = await header.text()

        if helpers.match_products(product_name, title):
            await header.click()
            price = await page.locator(".bold.stock-left")
            # helpers.evaluate_element(price)
            # price_text = await price.text()
            # print("price_text 👉", price_text)
            # print("price_text length 👉", len(price_text))
            # return float(price_text.strip().replace("$", ""))
            break
        else:
            item_index += 1
########### UNDER CONSTRUCTION #########

            
            
# async def get_solaris_japan_price(product_name):
#     item_index = 0
#     page = await get_page("https://solarisjapan.com")
#     product_name = (
#         "Jujutsu Kaisen Dai 2 Ki - Fushiguro Touji - Jurei (Bukiko) - Luminasta - Rinsen (SEGA)"
#     )

#     try:
#         await page.get_by_role("textbox", name="Search a product").click()
#         await page.get_by_role("textbox", name="Search a product").fill(product_name)
#         await page.keyboard.press("Enter")
#     except Exception as e:
#         print("error 👉", e)

#     await page.wait_for_timeout(2000)

#     title = ""
#     while True:
#         header = await page.locator(".title").nth(item_index)
#         title = await header.text()
#         if helpers.match_products(product_name, title):
#             await header.click()

#             price = await page.locator(".product-submit__btn--red .money")
#             price_text = await price.text()
#             return float(price_text.strip().replace("$", ""))
#         else:
#             item_index += 1
            from .signup_form import SignUpForm

            
async def get_big_bad_toy_store_price(product_name):
    item_index = 0
    page = await get_page("https://bigbadtoystore.com")
    # product_name = "Chainsaw Man Aki Hayakawa 1/7 Scale Figure"

    try:
        # Uncomment and adapt the following lines for search functionality
        await page.locator("#searchbox1").fill(product_name)
        await page.wait_for_timeout(2000)
        await page.keyboard.press("Enter")
    except Exception as e:
        print("error 👉", e)

    # Uncomment and adapt the following lines for price retrieval
    # title = ""
    # while True:
    #     header = await page.locator(".p-product-list__title").nth(item_index)
    #     title = await header.text()

    #     if helpers.match_products(product_name, title):
    #         price = await page.locator(".p-price__regular").nth(item_index)
    #         price_text = await price.text()
    #         return float(price_text.strip().replace("$", ""))
    #     else:
    #         item_index += 1
    
    
    
    
    
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


########## HAVE AN ISSUE WITH THE MODAL (DIALOG BOX) BLOCKING PROGRESS INTO SITE
async def scrape_entertainment_earth(product_name, limit):
    async with async_playwright() as p:
        site_name = "Entertainment Earth"
        url = "https://www.entertainmentearth.com"
        product_name = "ONE PIECE - LUFFY PLUSH 8''"
        page = await get_page(p, url)

        page.on("dialog", lambda dialog: dialog.dismiss())
        await page.get_by_role("button").nth(1).click()
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

async def scrape_website(product_name, website_name, url, limit):
    async with async_playwright() as p:
        page = await get_page(p, WEBSITE_CONFIGS[website_name]["url"])
        
        try:
            await page.locator(WEBSITE_CONFIGS[website_name]["search_bar_locator"]).fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, website_name, limit)
        except Exception as error:
            print("Error searching through Otaku Mode: \n")
            print(error)





# not basic
async def scrape_superanimestore(product_name, limit):
    async with async_playwright() as p:
        site_name = "Super Anime Store"
        url = "https://superanimestore.com"
        product_name = "ONE PIECE - LUFFY PLUSH 8''"
        page = await get_page(p, url)

        try:
            ## pop up
            await asyncio.sleep(1)  # special condition
            await page.locator(".privy-x").click()  # special condition
            
            ## click to search
            await page.locator(".modal__toggle-open.icon.icon-search").nth(0).click() # special condition

            await page.locator("#Search-In-Modal-1").fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Super Anime Store: \n")
            print(error)
            
            
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
    elif name == "HLJ":&& productName.length <= 15
        query["header_locator"] = "header_locator_for_HLJ"
        query["price_locator"] = "price_locator_for_HLJ"
    elif name == "Big Bad Toy Store":
        query["header_locator"] = "header_locator_for_Big_Bad_Toy_Store"
        query["price_locator"] = "price_locator_for_Big_Bad_Toy_Store"
    return query


async def main(product_name):

    await scrape_amazon(product_name, 2)  # working with old format

    # await scrape_crunchyroll(product_name, 2)  # working
    # await scrape_ebay(product_name, 2) ## working
    # await scrape_superanimestore(product_name, 2) ## working
    # await scrape_otaku_mode(product_name, 2) ## working
    # await scrape_japan_figure(product_name, 2) ## working
    # await scrape_kotous(product_name, 2) ## working

    # await scrape_entertainment_earth(product_name, 2) ## NOT WORKING
    # await scrape_solaris_japan(product_name, 2) ## NOT WORKIN
    
    
    
    async def scrape_kotous(product_name, limit):
    async with async_playwright() as p:
        site_name = "Kotous"
        url = "https://kotous.com"
        product_name = "ARTFX J SATORU GOJO JUJUTSU KAISEN 0 VER."
        product_name = "butter bean ball pufferoni"
        page = await get_page(p, url)

        try:
            # special condition
            await asyncio.sleep(1)  # special condition
            await page.get_by_role("link", name="Close").nth(1).click()
            await page.locator("input[placeholder='Enter keywords to search...']").fill(product_name)
            await page.keyboard.press("Enter")
            await filter_matches(product_name, page, site_name, limit)
        except Exception as error:
            print("Error searching through Kotous: \n")
            print(error)
            
            
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
                    # image = await get_image(page, i)
                    price = await get_amazon_price(page, i)
                    # match = create_match(name, image, price)
                    # website["matches"].append(match)
                    counter += 1
        except AssertionError:
            print("No results found")
            
            
            
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
        print(f"No results found for {product_name} in {website_name}")
        
        
        
async def main(product_name):
    # product_name = "Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan)" # for amazon and crunchy and ebay
    # product_name = "Chainsaw Man Aki Hayakawa 1/7 Scale Figure"  # for otaku mode
    # product_name = "Super Robot Chogokin Kaizoku Sentai Gokaiger Gokaioh" # for japan figures
    # product_name = "Dragon Ball Z Banpresto Solid Edge Works Departure 12 Super Saiyan 2 Son Gohan"
    # product_name = "ARTFX J SATORU GOJO JUJUTSU KAISEN 0 VER."  # for kotous
    # product_name = "ONE PIECE - LUFFY PLUSH 8''"  # for super store
    # product_name = "butter bean ball pufferoni"

    tasks = []
    for website_name, config in WEBSITE_CONFIGS.items():
        tasks.append(scrape_website(product_name, website_name, 2))
    await asyncio.gather(*tasks)
    
    
    
    
    
    
    
    
page.add_init_script({
navigator.webdriver = false
Object.defineProperty(navigator, 'webdriver', {
get: () => false
})



async def get_big_bad_toy_store_price(product_name):
    async with async_playwright() as p:
        item_index = 0
        page = await get_page(p, "https://bigbadtoystore.com")
        product_name = "Chainsaw Man Aki Hayakawa 1/7 Scale Figure"

        try:
            # Uncomment and adapt the following lines for search functionality
            await page.locator("#searchbox1").fill(product_name)
            await page.keyboard.press("Enter")
        except Exception as e:
            print("error 👉", e)


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
WEBSITE_CONFIGS = {
    "Amazon": {
        "id": 2,
        "url": "https://www.amazon.com",
        "search_bar_locator": "input[name='field-keywords']",
        "header_locator": ".a-size-base-plus.a-color-base.a-text-normal",
        "price_locator": ".srp-results .s-item__price",
        "pop_up_locator": None,
        "search_button_locator": None,
        "image_locator": ".s-image-square-aspect .s-image",
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





asyncio.run(
    main("Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan)"))




                match = {
                    "name": website_product_name,
                    "img_src": await get_image(website_name, page, index),
                    "price": await get_price(website_name, page, index),
                    "url": await get_url(website_name, page, index),
                }
                match_count += 1
                print("product: ", match["name"])
                print("price: ", match["price"])
                print("img_src:", match["img_src"])
                print("url: ", match["url"] + "\n")
                


            if match_products(product_name, website_product_name):
                img_src = await get_image(website_name, page, index)
                price = await get_price(website_name, page, index)
                url = await get_url(website_name, page, index)
                match_count += 1
                print("product: ", website_product_name)
                print("price: ", price)
                print("img_src:", img_src)
                print("url: ", url + "\n")