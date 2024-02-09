# async def get_entertainment_earth_price(product_name):
#     item_index = 0
#     browser = await async_playwright().chromium.launch(headless=True, product="chrome")
#     context = await browser.new_context()
#     page = await context.new_page()
#     await page.goto("https://entertainmentearth.com")

#     try:
#         await page.get_by_role("textbox", name="Search Field").fill(product_name)
#         await page.get_by_role("button", name="Search").click()
#     except Exception as e:
#         print("error 👉", e)

#     title = ""
#     while True:
#         header = await page.locator(".h4.item-name").nth(item_index)
#         title = await header.text()

#         if helpers.match_products(product_name, title):
#             price = await page.locator(".item-price").nth(item_index)
#             price_text = await price.text()
#             return float(price_text.strip().replace("$", ""))
#         else:
#             item_index += 1

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

            
# async def get_otaku_mode_price(product_name):
#     item_index = 0
#     page = await get_page("https://otakumode.com")
#     # product_name = "Chainsaw Man Aki Hayakawa 1/7 Scale Figure"

#     try:
#         await page.get_by_placeholder("Search Products...").fill(product_name)
#         await page.keyboard.press("Enter")
#     except Exception as e:
#         print("error 👉", e)

#     title = ""
#     while True:
#         header = await page.locator(".p-product-list__title").nth(item_index)
#         title = await header.text()

#         if helpers.match_products(product_name, title):
#             price = await page.locator(".p-price__regular").nth(item_index)
#             price_text = await price.text()
#             return float(price_text.strip().replace("$", ""))
#         else:
#             item_index += 1
            
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
            
# async def get_japan_figure_price(product_name):
#     item_index = 0
#     page = await get_page("https://japan-figure.com")
#     # product_name = "Chainsaw Man Aki Hayakawa 1/7 Scale Figure"

#     try:
#         await page.get_by_placeholder("What are you looking for?").fill(product_name)
#         await page.keyboard.press("Enter")
#     except Exception as e:
#         print("error 👉", e)

#     title = ""
#     while True:
#         header = await page.locator(".p-product-list__title").nth(item_index)
#         title = await header.text()

#         if helpers.match_products(product_name, title):
#             price = await page.locator(".p-price__regular").nth(item_index)
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
    
# async def get_kotous_price(product_name):
#     item_index = 0
#     page = await get_page("https://kotous.com")
#     product_name = "ARTFX J SATORU GOJO JUJUTSU KAISEN 0 VER."

#     try:
#         await page.get_by_role("link", name="Close").nth(1).click()
#         await page.get_by_placeholder("Enter keywords to search...").fill(product_name)
#         await page.keyboard.press("Enter")
#     except Exception as e:
#         print("error 👉", e)

#     title = ""
#     while True:
#         header = await page.locator(".product-item-link").nth(item_index)
#         title = await header.text()

#         if helpers.match_products(product_name, title):
#             price = await page.locator(".price-final_price .price").nth(item_index)
#             price_text = await price.text()
#             return float(price_text.strip().replace("$", ""))
#         else:
#             item_index += 1