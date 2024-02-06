from thefuzz import fuzz
from thefuzz import process

def match_products(name1, name2):
    normalized_name1 = name1.lower().strip()
    normalized_name2 = name2.lower().strip()
    print(f"==>> normalized_name1: {normalized_name1}")
    print(f"==>> normalized_name2: {normalized_name2}")
    similarity = fuzz.ratio(normalized_name1, normalized_name2)
    print(f"==>> similarity: {similarity}")
    threshold = 80  # Adjust as needed based on your data
    return similarity >= threshold

match_products("Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan )", "Banpresto Dragon Ball Z Solid Edge Works vol.5(A:Super Saiyan 2 Son Gohan)")