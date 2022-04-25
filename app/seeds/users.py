from app.models import db, User, Post


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='BigM', email='bigmoney@gmail.com', full_name="Corpo Trash", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo2 = User(
        username='Clasps', email='clasper@gmail.com', full_name="Hip Scum", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo3 = User(
        username='theRashter', email='bigrash@gmail.com', full_name="Regular Rash", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo4 = User(
        username='TijuanaSauna', email='bigring@gmail.com', full_name="Tiajuana Pat", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo5 = User(
        username='DingoAteMeBB', email='ausiman@gmail.com', full_name="Dug Dingo", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo6 = User(
        username='Didmyfriendleave', email='pleasestopit@gmail.com', full_name="Iam Leaving", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo7 = User(
        username='Givemeareason22', email='toughguy@gmail.com', full_name="Big Man", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    demo8 = User(
        username='pushmedownthestairs', email='leavemealone@gmail.com', full_name="Stair Pusher", image_url="https://drive.google.com/uc?id=1GKuD4SakhsPGKsmmC_PpmsYsCcXhP-o9", password='password')
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
