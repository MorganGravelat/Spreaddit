from .db import db

class Commentlike(db.Model):
    __tablename__ = 'commentlikes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    liked = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="commentlikes")
    comments = db.relationship("Comment", back_populates="commentlikes")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'comment_id': self.comment_id,
        'liked': self.liked,
    }
