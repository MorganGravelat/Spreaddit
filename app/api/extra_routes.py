from flask import Blueprint
from app.models import Spreadpost

extra_routes = Blueprint('spreadsextra', __name__)

@extra_routes.route('/check/<int:post_id>/<int:user_id>')
def check_spreaded(post_id,user_id):
    checks = Spreadpost.query.filter(Spreadpost.post_id == post_id).filter(Spreadpost.user_id == user_id).all()
    return {'checks': [check.to_dict() for check in checks]}
