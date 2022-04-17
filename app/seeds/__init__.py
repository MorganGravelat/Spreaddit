from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .spreads import seed_spreads, undo_spreads
from .spreadusers import seed_spreadusers, undo_spreadusers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_posts()
    seed_spreads()
    seed_spreadusers()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_posts()
    undo_spreads()
    undo_spreadusers()
