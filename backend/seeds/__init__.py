from flask.cli import AppGroup
from .websites import seed_websites, undo_websites
from .settings import seed_settings, undo_settings
# from .products import seed_products, undo_products
# from .matches import seed_matches, undo_matches

from backend.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_matches()
        # undo_products()
        undo_settings()
        undo_websites()
    seed_settings()
    seed_websites()
    # seed_products()
    # seed_matches()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_matches()
    # undo_products()
    undo_websites()
    undo_settings()
    
