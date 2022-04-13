from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    full_name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.Text(), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    comments = db.relationship("Comment", back_populates="user", cascade="all, delete")
    posts = db.relationship("Post", back_populates="user", cascade="all, delete")
    commentlikes = db.relationship("Commentlike", back_populates="user", cascade="all, delete")
    postlikes = db.relationship("Postlike", back_populates="user", cascade="all, delete")
    spreads = db.relationship("Spread", back_populates="user", cascade="all, delete")
    spreadusers = db.relationship("Spreaduser", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'image_url': self.image_url,
            'hashed_password': self.hashed_password
        }
