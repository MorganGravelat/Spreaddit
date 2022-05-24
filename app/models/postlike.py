from .db import db

class Postlike(db.Model):
    __tablename__ = 'postlikes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    liked = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="postlikes")
    posts = db.relationship("Post", back_populates="postlikes")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'post_id': self.post_id,
        'liked': self.liked,
    }
