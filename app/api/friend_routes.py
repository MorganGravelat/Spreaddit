from flask import Blueprint, jsonify, request
from app.models import Friend, Spreaduser, db

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/<int:user_id>')
def friends(user_id):
    friends = Friend.query.filter(Friend.requester_id == user_id).all()
    requests = [friend.to_dict() for friend in friends]
    oFriends = Friend.query.filter(Friend.requestee_id == user_id).all()
    requesters = [oFriend.to_dict() for oFriend in oFriends]
    resArr = requests + requesters
    print(friends,user_id,"WHAT IS HAPPENING IN HERE? FRIENDS?")
    return {'friends': resArr}

@friend_routes.route('/create', methods=['POST'])
def create_friend():
    data = dict(request.json)
    newFriend = Friend(
        requester_id=data['requester_id'],
        requestee_id=data['requestee_id'],
        accepted=False
    )
    db.session.add(newFriend)
    db.session.commit()
    print(newFriend.to_dict(), "New Friend Has Worked In the Route")
    return newFriend.to_dict()

@friend_routes.route('/delete', methods=['DELETE'])
def delete_friend():
    friend = dict(request.json)
    if 'requestr_id' in friend:
        requestee_id = friend['user_id']
        requester_id = friend['requestr_id']
    if 'requeste_id' in friend:
        requester_id = friend['user_id']
        requestee_id = friend['requeste_id']
    friends = Friend.query.filter(Friend.requester_id == requester_id).filter(Friend.requestee_id == requestee_id).all()
    id = friends[0].id
    res = {'id': id}
    print(id, 'THIS IS THE ID YOU ARE LOOKING FOR!')
    for friend in friends:
        db.session.delete(friend)
    db.session.commit()
    return res

@friend_routes.route('/check/<int:user_id>/<int:friend_id>')
def checkfriend(user_id, friend_id):
    friends = Friend.query.filter(Friend.requester_id == user_id).filter(Friend.requestee_id == friend_id).first()
    if friends:
        return jsonify('True')
    ofriends = Friend.query.filter(Friend.requestee_id == user_id).filter(Friend.requester_id == friend_id).first()
    if ofriends:
        return jsonify('True')
    else:
        return jsonify('False')

@friend_routes.route('/check/spread/<int:user_id>/<int:spread_id>/')
def checkspreadfriend(user_id, spread_id):
    results = Spreaduser.query.filter(Spreaduser.user_id == user_id).filter(Spreaduser.spread_id == spread_id).all()
    return {'posts': [result.to_dict() for result in results]}

@friend_routes.route('/edit', methods=["PUT"])
def edit_friend():
    friendInfo = dict(request.json)
    user_id = friendInfo['user_id']
    friend_id = friendInfo['friend_id']
    data = Friend.query.filter(Friend.requestee_id == user_id).filter(Friend.requester_id == friend_id).first()
    data.accepted = True
    db.session.commit()
    return data.to_dict()
