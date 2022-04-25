from app.models import db, Spread


# Adds a demo user, you can add other users here if you want
def seed_spreads():
    demospread = Spread(
        title='SPREADSX', image_url='https://i.imgur.com/X3Cw60g.png',user_id=1)
    demospread2 = Spread(
        title='SPREADSXX', image_url='https://i.imgur.com/X3Cw60g.png',user_id=1)
    demospread3 = Spread(
        title='SPREADSXXX', image_url='https://i.imgur.com/X3Cw60g.png',user_id=1)
    demospread4 = Spread(
        title='SPREADSXXXX', image_url='https://i.imgur.com/X3Cw60g.png',user_id=1)

    db.session.add(demospread)
    db.session.add(demospread2)
    db.session.add(demospread3)
    db.session.add(demospread4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_spreads():
    db.session.execute('TRUNCATE spreads RESTART IDENTITY CASCADE;')
    db.session.commit()
