from backend.models import db, Setting, environment, SCHEMA
from sqlalchemy.sql import text

def seed_settings():
    settings = Setting(
        similarity_threshold=80,
        filter_limit=5,
        select_all=True,
        select_highest=False,
        dark_mode=False
    )
    db.session.add(settings) 
    db.session.commit()

def undo_settings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.settings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM settings"))
    db.session.commit()
