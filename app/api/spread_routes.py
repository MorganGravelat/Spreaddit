from flask import Blueprint, jsonify, request
from app.models import Spreaduser, Spread, Spreadpost, db

spread_routes = Blueprint('spreads', __name__)


@spread_routes.route('/<int:id>')
def spreads(id):
    spreads = Spreaduser.query.filter(Spreaduser.user_id == id).all()
    return {'spreads': [spread.to_dict() for spread in spreads]}

@spread_routes.route('/single/<int:id>')
def get_spread(id):
    spread = Spread.query.get(id)
    return spread.to_dict()

@spread_routes.route('/posts/<int:id>')
def get_posts(id):
    posts = Spreadpost.query.filter(Spreadpost.spread_id == id).all()
    return {'posts': [post.to_dict() for post in posts]}

@spread_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_spread(id):
    spread = Spread.query.get(id)
    res = {"id": id}
    db.session.delete(spread)
    db.session.commit()
    return res

@spread_routes.route('/create', methods=['POST'])
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

@spread_routes.route('/create/user', methods=['POST'])
def create_spreaduser():
    data = dict(request.json)
    newSpreadU = Spreaduser(
        spread_id=data['spread_id'],
        user_id=data['user_id'],
    )
    db.session.add(newSpreadU)
    db.session.commit()
    return newSpreadU.to_dict()

@spread_routes.route('/create/post', methods=['POST'])
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
