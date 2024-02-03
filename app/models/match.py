from .db import db, environment, SCHEMA, add_prefix_for_prod

# match belongs to one website
class Match(db.Model):
    __tablename__ = 'matches'

    if environment == "websiteion":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    img_src = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    url = db.Column(db.Text, nullable=False)
    website_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("websites.id")), nullable=False)
    website_rel = db.relationship("Website", back_populates="match_rel")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "img_src": self.img_src,
            "price": self.price,
            "url": self.url,
            "website_id": self.website_id,
            "website": self.website_rel.to_dict(),
        }
