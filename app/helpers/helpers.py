from fuzzywuzzy import fuzz


def match_products(name1, name2):
    normalized_name1 = name1.lower().strip()
    normalized_name2 = name2.lower().strip()
    similarity = fuzz.ratio(normalized_name1, normalized_name2)
    threshold = 0.7  # Adjust as needed based on your data
    return similarity >= threshold

