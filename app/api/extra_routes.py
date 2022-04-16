from flask import Blueprint
from app.models import Spreadpost

extra_routes = Blueprint('spreadss', __name__)

@extra_routes.route('/check/<int:post_id>/<int:user_id>')
def check_spreaded(post_id,user_id):
    print('BEFORE IT WORKS')
    checks = Spreadpost.query.filter(Spreadpost.post_id == post_id).filter(Spreadpost.user_id == user_id).all()
    print(checks,'AYO IT WORKS HAHAHAHAHAHAA CHECKS WORKED I LOVE IT')
    return {'checks': [check.to_dict() for check in checks]}
