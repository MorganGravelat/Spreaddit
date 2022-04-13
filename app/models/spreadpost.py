from .db import db

class Spreadpost(db.Model):
    __tablename__ = 'spreadlikes'
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    spread_id = db.Column(db.Integer, db.ForeignKey("spreads.id"), nullable=False)

    posts = db.relationship("Post", back_populates="spreadposts")
    spreads = db.relationship("Spread", back_populates="spreadposts")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'spread_id': self.spread_id,
    }
