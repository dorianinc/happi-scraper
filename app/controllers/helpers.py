from thefuzz import fuzz
from thefuzz import process


def match_products(name1, name2):
    normalized_name1 = name1.lower().strip()
    normalized_name2 = name2.lower().strip()
    similarity = fuzz.partial_ratio(normalized_name1, normalized_name2)
    # print(f"==>> Name of product I'm looking up: {normalized_name1}")
    # print(f"==>> Name of product on website: {normalized_name2}")
    return similarity


def create_product(name):
    product_skeleton = {
    "name": None,
    "img_src": None,
    "websites": [],
    }
    
    return {
        **product_skeleton,
        "name": name
    }

def create_website(name, url):
    website_skeleton = {
    "name": None,
    "url": None,
    "matches": [],
    }
    
    return {
        **website_skeleton,
        "name": name,
        "url": url
    }

def create_match(name, img_src, price, url):
    match_skeleton = {
    "name": None,
    "img_src": None,
    "price": None,
    "url": None,
    }
    
    return {
        **match_skeleton,
        "name": name,
        "img_src": image,
        "price": price,
        # "url": url,
        # "product_id": product_id,
        # "website_id": website_id
    }
    
    
