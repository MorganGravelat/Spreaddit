from flask import Blueprint, jsonify, request
from app.models import Spreaduser, Spread, Spreadpost, db

spread_routes = Blueprint('spreads', __name__)


@spread_routes.route('/<int:id>/')
def spreads(id):
    spreads = Spreaduser.query.filter(Spreaduser.user_id == id).all()
    return {'spreads': [spread.to_dict() for spread in spreads]}

@spread_routes.route('/single/<int:id>/')
def get_spread(id):
    spread = Spread.query.get(id)
    return spread.to_dict()

@spread_routes.route('/posts/<int:id>/')
def get_posts(id):
    posts = Spreadpost.query.filter(Spreadpost.spread_id == id).all()
    return {'posts': [post.to_dict() for post in posts]}

@spread_routes.route('/user/posts/<int:id>/')
def get_user_posts(id):
    posts = Spreadpost.query.filter(Spreadpost.user_id == id).all()
    print(posts,'backend checker in this prtint')
    return {'posts': [post.to_dict() for post in posts]}

@spread_routes.route('/delete/<int:id>/', methods=['DELETE'])
def delete_spread(id):
    spread = Spread.query.get(id)
    res = {"id": id}
    db.session.delete(spread)
    db.session.commit()
    return res

@spread_routes.route('/delete/user/<int:id>/', methods=['DELETE'])
def delete_spreaduser(id):
    spreadU = dict(request.json)
    spread_id = spreadU['spread_id']
    spreadU = Spreaduser.query.filter(Spreaduser.user_id == id).filter(Spreaduser.spread_id == spread_id).all()
    res = {'user_id': id, 'spread_id': spread_id}
    for user in spreadU:
        db.session.delete(user)
    db.session.commit()
    return res

@spread_routes.route('/delete/friend/', methods=['DELETE'])
def delete_friend():
    info = dict(request.json)
    user_id = info['user_id']
    friend_id = info['friend_id']
    deleteList1 = []
    spreadsList1 = Spreaduser.query.filter(Spreaduser.user_id == user_id).all()
    for spreaduser in spreadsList1:
        spreadinfo = spreaduser.to_dict()
        if friend_id == spreadinfo['spread_user_id']:
            deleteList1.append(spreadinfo['spread_id'])
            db.session.delete(spreaduser)
    for spreadId in deleteList1:
        posting = Spreadpost.query.filter(Spreadpost.user_id == user_id).filter(Spreadpost.spread_id == spreadId).all()
        for post in posting:
            db.session.delete(post)
    deleteList2 = []
    spreadsList2 = Spreaduser.query.filter(Spreaduser.user_id == friend_id).all()
    for spreaduser in spreadsList2:
        spreadinfo = spreaduser.to_dict()
        if user_id == spreadinfo['spread_user_id']:
            deleteList2.append(spreadinfo['spread_id'])
            db.session.delete(spreaduser)
    for spreadId in deleteList2:
        posting = Spreadpost.query.filter(Spreadpost.user_id == friend_id).filter(Spreadpost.spread_id == spreadId).all()
        for post in posting:
            db.session.delete(post)
    db.session.commit()
    return {'res': 'ok'}

@spread_routes.route('/edit/<int:spreadId>/', methods=["PUT"])
def edit_spread(spreadId):
    spread = dict(request.json)
    data = Spread.query.get(spreadId)
    data.title = spread['title'],
    data.image_url = spread['image_url'],
    db.session.commit()
    return data.to_dict()

@spread_routes.route('/create/', methods=['POST'])
def create_post():
    data = dict(request.json)
    newSpread = Spread(
        title = data['title'],
        image_url=data['image_url'],
        user_id=data['user_id'],
    )
    db.session.add(newSpread)
    db.session.commit()
    return newSpread.to_dict()

@spread_routes.route('/create/user/', methods=['POST'])
def create_spreaduser():
    data = dict(request.json)
    newSpreadU = Spreaduser(
        spread_id=data['spread_id'],
        user_id=data['user_id'],
    )
    db.session.add(newSpreadU)
    db.session.commit()
    return newSpreadU.to_dict()

@spread_routes.route('/create/post/', methods=['POST'])
def create_spreadposts():
    data = dict(request.json)
    newSpreadP = Spreadpost(
        spread_id=data['spread_id'],
        post_id=data['post_id'],
        user_id=data['user_id'],
    )
    db.session.add(newSpreadP)
    db.session.commit()
    return newSpreadP.to_dict()

@spread_routes.route('/check/<int:post_id>/<int:user_id>/')
def check_spreaded(post_id,user_id):
    print('BEFORE IT WORKS')
    checks = Spreadpost.query.filter(Spreadpost.post_id == post_id).filter(Spreadpost.user_id == user_id).all()
    print(checks,'AYO IT WORKS HAHAHAHAHAHAA CHECKS WORKED I LOVE IT')
    return {'checks': [check.to_dict() for check in checks]}

@spread_routes.route('/check/<int:user_id>/')
def check_spreaded_posts(user_id):
    print('BEFORE IT WORKS')
    checks = Spreadpost.query.filter(Spreadpost.user_id == user_id).all()
    return {'spreaded': [check.to_dict() for check in checks]}

@spread_routes.route('/delete/post/<int:post_id>/<int:user_id>/', methods=['DELETE'])
def delete_spreadpost(post_id, user_id):
    res = {"post_id": post_id}
    deletes = Spreadpost.query.filter(Spreadpost.post_id == post_id).filter(Spreadpost.user_id == user_id).all()
    for delete in deletes:
        db.session.delete(delete)
    print('HELLO? IT WORKED? REALLY? HUH?')
    db.session.commit()
    return res

@spread_routes.route('/delete/user/post/<int:spread_id>/<int:user_id>/', methods=['DELETE'])
def delete_spreaduserpost(spread_id, user_id):
    res = {"spread_id": spread_id, "user_id": user_id}
    deletes = Spreadpost.query.filter(Spreadpost.spread_id == spread_id).filter(Spreadpost.user_id == user_id).all()
    for delete in deletes:
        db.session.delete(delete)
    print('HELLO? IT WORKED? REALLY? HUH?')
    db.session.commit()
    return res
