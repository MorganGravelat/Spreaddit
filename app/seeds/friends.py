from app.models import db, Friend


# Adds friends to the main profile, feel free to add more
def seed_friends():
    demofriend = Friend(
        requester_id=1, requestee_id=2,accepted=True)
    demofriend2 = Friend(
        requester_id=1, requestee_id=3,accepted=True)
    demofriend3 = Friend(
        requester_id=1, requestee_id=4,accepted=True)

    db.session.add(demofriend)
    db.session.add(demofriend2)
    db.session.add(demofriend3)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_friends():
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()
