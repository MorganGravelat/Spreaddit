from app.models import db, User, Post


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', full_name="demo man", image_url="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/950.jpg", password='password')
    demo2 = User(
        username='Demo2', email='demo2@aa.io', full_name="demo2 man", image_url="https://drive.google.com/uc?id=11gX_acqq3pX5UM2CKe4t6bD_Y635oZ-o", password='password')
    demo3 = User(
        username='Demo3', email='demo3@aa.io', full_name="demo3 man", image_url="https://drive.google.com/uc?id=1uIsAj-A0IKisKA7wc3vRjbcUmy8KWeQB", password='password')
    demo4 = User(
        username='Demo4', email='demo4@aa.io', full_name="demo4 man", image_url="https://drive.google.com/uc?id=1RKVlRe3HPSTaJ8lPyX7ok_V6H6VzlvFM", password='password')
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
