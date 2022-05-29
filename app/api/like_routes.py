from flask import Blueprint, jsonify, request
from app.models import Postlike, Commentlike, db

like_routes = Blueprint('likes', __name__)

# @comment_routes.route('/create', methods=["POST"])
# def post_comment():
#     comment = dict(request.json)

#     newComment = Comment(
#         comment=comment['comment'],
#         user_id=comment['user_id'],
#         post_id=comment['post_id'],
#     )
#     db.session.add(newComment)
#     db.session.commit()
#     return newComment.to_dict()


@like_routes.route('/')
def get_post_likes():
    likes = Postlike.query.all()
    print('IS THIS WORKING HUHHHHH')
    likesList = []
    likesDict = {}
    for like in likes:
        likesList.append(like.to_dict())
    for lik in likesList:
        if lik['post_id'] in likesDict:
            likesDict[lik['post_id']] = likesDict[lik['post_id']] + lik['liked']
        else:
            likesDict[lik['post_id']] = lik['liked']
    return jsonify(likesDict)

# @like_routes.route('/<int:post_id>/<int:user_id>/')
# def get_post_liked(post_id,user_id):
#     print('HEYO THIS IS WORKING IN HERE!@')
#     likes = Postlike.query.filter(Postlike.post_id == post_id).filter(Postlike.user_id == user_id).all()
#     print(likes, 'THIS IS LIKES IN BACKEND IN ACTION')
#     liked = 'false'
#     if likes:
#         liked = 'true'
#     return liked

@like_routes.route('/<int:user_id>/')
def get_user_likes(user_id):
    print('HEYO THIS IS WORKING IN HERE!@ HEY NOTICE THIS SHIT RIGHT HERE OYU HEAR ME ?')
    likes = Postlike.query.filter(Postlike.user_id == user_id).all()
    likesList = {}
    for like in likes:
        likeDict = like.to_dict()
        print(likeDict,'HEY THIS IS THE LIKE DICTIN ACITON HOPEFULYL WE SESISIJISJSISSISI')
        likesList[likeDict['post_id']] = [likeDict['post_id'], likeDict['liked']]
        #likesList.append([likeDict['post_id'], likeDict['liked']]) #YOU ARE GOING TO
    return jsonify(likesList)

@like_routes.route('/create/', methods=["POST"])
def post_like():
    like = dict(request.json)
    newLike = Postlike(
        user_id=like['user_id'],
        post_id=like['post_id'],
        liked=like['liked'],
    )
    db.session.add(newLike)
    db.session.commit()
    return newLike.to_dict()
# @comment_routes.route('/delete/<int:id>', methods=["DELETE"])
# def delete_comment(id):
#     data = dict(request.json)
#     comment = Comment.query.get(id)sdad
#     res = {"id": id}
#     db.session.delete(comment)
#     db.session.commit()
#     return res
