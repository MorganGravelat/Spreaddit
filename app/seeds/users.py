from app.models import db, User, Post


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', full_name="demo man", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo2 = User(
        username='Demo2', email='demo2@aa.io', full_name="demo2 man", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo3 = User(
        username='Demo3', email='demo3@aa.io', full_name="demo3 man", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo4 = User(
        username='Demo4', email='demo4@aa.io', full_name="demo4 man", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
