from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .spreads import seed_spreads, undo_spreads
from .spreadusers import seed_spreadusers, undo_spreadusers
from .friends import seed_friends, undo_friends

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_posts()
    seed_spreads()
    seed_spreadusers()
    seed_friends()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_friends()
    undo_spreadusers()
    undo_spreads()
    undo_posts()
    undo_users()
