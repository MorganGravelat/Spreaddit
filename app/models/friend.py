from .db import db

class Friend(db.Model):
    __tablename__ = 'friends'
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    requestee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    accepted = db.Column(db.Boolean, default=False, nullable=False)

    req = db.relationship("User", foreign_keys="Friend.requester_id")
    rec = db.relationship("User", foreign_keys="Friend.requestee_id")

    def to_dict(self):
        return {
        'id': self.id,
        'requester_id': self.requester_id,
        'requestee_id': self.requestee_id,
        'accepted': self.accepted,
        'requester_username': self.req.full_name,
        'requester_image_url': self.req.image_url,
        'requestee_username': self.rec.full_name,
        'requestee_image_url': self.rec.image_url,
    }
