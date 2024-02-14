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