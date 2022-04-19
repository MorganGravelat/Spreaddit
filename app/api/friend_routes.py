from flask import Blueprint, jsonify, request
from app.models import Friend, db

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
