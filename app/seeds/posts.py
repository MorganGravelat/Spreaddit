from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    demopost = Post(
        title='This sucks', post='Some people do not understand me!',image_url='https://drive.google.com/uc?id=1FU5VA1G8mJoY8q7NSuBwYZpV-1UOHLv3',user_id=1)

    db.session.add(demopost)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
