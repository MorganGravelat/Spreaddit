from .db import db
from sqlalchemy.types import DateTime
from datetime import datetime

class Spread(db.Model):
    __tablename__ = 'spreads'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.Text())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow())

    user = db.relationship("User", back_populates="spreads")
    spreadusers = db.relationship("Spreaduser", back_populates="spreads", cascade="all, delete")
    spreadposts = db.relationship("Spreadpost", back_populates="spreads", cascade="all, delete")

    def to_dict(self):
        return {
        'id': self.id,
        'title': self.title,
        'image_url': self.image_url,
        'user_id': self.user_id,
        'created_at': self.created_at,
    }
