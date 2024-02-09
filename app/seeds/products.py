from app.models import db, Product
from faker import Faker
fake = Faker()

def seed_products(num_matches=10):
    products = []
    for _ in range(num_products):
        product = Product(
            name=fake.word(),
            img_src=fake.image_url(),
        )
        products.append(product)

    db.session.bulk_save_objects(products)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))    
    db.session.commit()