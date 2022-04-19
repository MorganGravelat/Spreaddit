from flask import Blueprint, jsonify, request
from app.models import Post, db

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def posts():
    posts = Post.query.all()
    print(posts,'HEYHEYHEYFAFAFAFAFAFAFAFFAFFAFAFAFADFASFASFAFASFADFADFADFAFAFAFAFF')
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:id>')
def get_post(id):
    post = Post.query.get(id)
    return post.to_dict()


@post_routes.route('/create', methods=['POST'])
def create_post():
    data = dict(request.json)
    newPost = Post(
        title = data['title'],
        post=data['post'],
        image_url=data['image_url'],
        user_id=data['user_id'],
    )
    db.session.add(newPost)
    db.session.commit()
    print(newPost, "New Post Has Worked In the Route")
    return newPost.to_dict()

@post_routes.route('/edit/<int:id>', methods=["PUT"])
def edit_post(id):
    post = dict(request.json)
    data = Post.query.get(post['id'])

    data.title = post['title'],
    data.post = post['post'],
    data.image_url = post['image_url'],

    db.session.commit()
    return data.to_dict()

@post_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    res = {"id": id}
    db.session.delete(post)
    db.session.commit()
    return res
