from thefuzz import fuzz
from thefuzz import process

product_skeleton = {
  "name": None,
  "img_src": None,
  "websites": [],
}

website_skeleton = {
  "name": None,
  "url": None,
  "matches": [],
}

match_skeleton = {
  "name": None,
  "img_src": None,
  "price": None,
  "url": None,
}


def match_products(name1, name2):
    normalized_name1 = name1.lower().strip()
    normalized_name2 = name2.lower().strip()
    # print(f"==>> normalized_name1: {normalized_name1}")
    # print(f"==>> normalized_name2: {normalized_name2}")
    similarity = fuzz.ratio(normalized_name1, normalized_name2)
    # print(f"==>> similarity: {similarity}")
    threshold = 85
    return similarity >= threshold


def create_product(name):
    return {
        **product_skeleton,
        "name": name
    }

def create_website(name, url):
    return {
        **website_skeleton,
        "name": name,
        "url": url
    }

def create_match(name, img_src, price, url):
    return {
        **match_skeleton,
        "name": name,
        "img_src": image,
        "price": price,
        # "url": url,
        # "product_id": product_id,
        # "website_id": website_id
    }