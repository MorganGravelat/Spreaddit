from .db import db

class Spreadpost(db.Model):
    __tablename__ = 'spreadposts'
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    spread_id = db.Column(db.Integer, db.ForeignKey("spreads.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    posts = db.relationship("Post", back_populates="spreadposts")
    spreads = db.relationship("Spread", back_populates="spreadposts")
    user = db.relationship("User", back_populates="spreadposts")

    def to_dict(self):
        return {
        'id': self.id,
        'post_id': self.post_id,
        'spread_id': self.spread_id,
        'user_id': self.user_id,
        'post_title': self.posts.title,
        'post_image_url': self.posts.image_url,
        'post_user_id': self.posts.user_id,
        'post_post': self.posts.post,
    }
