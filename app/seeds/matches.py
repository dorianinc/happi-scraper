from app.models import db, Match, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, choice
from faker import Faker
fake = Faker()

def seed_matches(num_matches=60):
    matches = []
    for _ in range(num_matches):
        match = Match(
            name=fake.word(),
            img_src=fake.image_url(),
            price=fake.random_number(digits=3),
            url=fake.url(),
            product_id=randint(1, 10),
            website_id=randint(1, 13),
        )
        matches.append(match)

    db.session.bulk_save_objects(matches)
    db.session.commit()

def undo_matches():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.matches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM matches"))
    db.session.commit()
