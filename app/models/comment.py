from .db import db
from sqlalchemy.types import DateTime
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow())

    user = db.relationship("User", back_populates="comments")
    posts = db.relationship("Post", back_populates="comments")
    commentlikes = db.relationship("Commentlike", back_populates="comments", cascade="all, delete")

    def to_dict(self):
        return {
        'id': self.id,
        'comment': self.comment,
        'user_id': self.user_id,
        'post_id': self.post_id,
        'created_at': self.created_at,
        'user_image': self.user.image_url,
        'post_username': self.user.username,
    }
