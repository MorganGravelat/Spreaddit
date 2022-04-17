from .db import db

class Spreaduser(db.Model):
    __tablename__ = 'spreadusers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    spread_id = db.Column(db.Integer, db.ForeignKey("spreads.id"), nullable=False)

    user = db.relationship("User", back_populates="spreadusers")
    spreads = db.relationship("Spread", back_populates="spreadusers")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'spread_id': self.spread_id,
        'spread_title': self.spreads.title,
        'spread_image_url': self.spreads.image_url,
        'spread_user_id': self.spreads.user_id,
        'spread_created_at': self.spreads.created_at,
    }
