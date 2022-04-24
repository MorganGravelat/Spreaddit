from .db import db
from sqlalchemy.types import DateTime
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    post = db.Column(db.Text(), nullable=False)
    image_url = db.Column(db.Text())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow())

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="posts", cascade="all, delete")
    postlikes = db.relationship("Postlike", back_populates="posts", cascade="all, delete")
    spreadposts = db.relationship("Spreadpost", back_populates="posts", cascade="all, delete")

    def to_dict(self):
        return {
        'id': self.id,
        'title': self.title,
        'post': self.post,
        'image_url': self.image_url,
        'user_id': self.user_id,
        'created_at': self.created_at,
        'post_username': self.user.username,
    }
