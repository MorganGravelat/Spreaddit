from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    demopost = Post(
        title='This rocks', post='Some people do understand me!',image_url='https://i.imgur.com/FrP2U39.png',user_id=1)
    demopost2 = Post(
        title='This sucks', post='Some people do not understand me!',image_url='https://i.imgur.com/FrP2U39.png',user_id=2)
    demopost3 = Post(
        title='This claps!', post='Some people do understand the guy standing right behind you!',image_url='https://i.imgur.com/FrP2U39.png',user_id=3)
    demopost4 = Post(
        title='This cracks!', post='Some people see the triangles sitting in every day life, when will they come?!',image_url='https://i.imgur.com/FrP2U39.png',user_id=4)
    demopost5 = Post(
        title='This smacks!', post='Understand me some people!',image_url='https://i.imgur.com/FrP2U39.png',user_id=1)
    demopost6 = Post(
        title='This shakes my frame', post='Some people understand me too well!!',image_url='https://i.imgur.com/FrP2U39.png',user_id=5)
    demopost7 = Post(
        title='This makes me wavy', post='Swavy swervy make my gerdy turvy.',image_url='https://i.imgur.com/FrP2U39.png',user_id=6)
    demopost8 = Post(
        title='This snacks!', post='If you take out your right eye there is a key in every human beings eye socket just waiting for you to take it',image_url='https://i.imgur.com/FrP2U39.png',user_id=7)
    demopost9 = Post(
        title='This jacked!', post='Big gains today?! I DON"T KNOW WHAT JUST HAPPENED',image_url='https://i.imgur.com/FrP2U39.png',user_id=8)
    demopost10 = Post(
        title='Big Wopo', post='Hopo that wopo is not in the store today you fo! Do not look me in the eyes too long! Stop it!',image_url='https://i.imgur.com/FrP2U39.png',user_id=1)

    db.session.add(demopost)
    db.session.add(demopost2)
    db.session.add(demopost3)
    db.session.add(demopost4)
    db.session.add(demopost5)
    db.session.add(demopost6)
    db.session.add(demopost7)
    db.session.add(demopost8)
    db.session.add(demopost9)
    db.session.add(demopost10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
