from app.models import db, Spreaduser


# Adds a demo user, you can add other users here if you want
def seed_spreadusers():
    demospreadU1 = Spreaduser(
        user_id=1, spread_id=1)
    demospreadU2 = Spreaduser(
        user_id=1, spread_id=2)
    demospreadU3 = Spreaduser(
        user_id=1, spread_id=3)
    demospreadU4 = Spreaduser(
        user_id=1, spread_id=4)

    db.session.add(demospreadU1)
    db.session.add(demospreadU2)
    db.session.add(demospreadU3)
    db.session.add(demospreadU4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_spreadusers():
    db.session.execute('TRUNCATE spreadusers RESTART IDENTITY CASCADE;')
    db.session.commit()
