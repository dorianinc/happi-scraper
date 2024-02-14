from app.models import db, Website, environment, SCHEMA
from sqlalchemy.sql import text

def seed_websites():
    websites_data = [
        {'name': 'AAA Anime', 'url': 'https://AAAanime.com'},
        {'name': 'Amazon', 'url': 'https://amazon.com'},
        {'name': 'Big Bad Toy Store', 'url': 'https://bigbadtoystore.com'},
        {'name': 'Crunchyroll Store', 'url': 'https://store.crunchyroll.com'},
        {'name': 'eBay', 'url': 'https://eBay.com'},
        {'name': 'Entertainment Earth', 'url': 'https://entertainmentearth.com'},
        {'name': 'GK Figure Worldwide', 'url': 'https://gkfigureworldwide.com'},
        {'name': 'HLJ', 'url': 'https://hlj.com'},
        {'name': 'Japan Figure', 'url': 'https://japan-figure.com'},
        {'name': 'Kotous', 'url': 'https://kotous.com'},
        {'name': 'Otaku Mode', 'url': 'https://otakumode.com'},
        {'name': 'Solaris Japan', 'url': 'https://solarisjapan.com'},
        {'name': 'Super Anime Store', 'url': 'https://Superanimestore.com'}
    ]

    all_websites = [Website(name=website['name'], url=website['url'])
                    for website in websites_data]
    add_websites = [db.session.add(website) for website in all_websites]
    db.session.commit()

def undo_websites():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.websites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM websites"))
    db.session.commit()

