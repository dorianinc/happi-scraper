from .db import db, environment, SCHEMA, add_prefix_for_prod

# product belongs to one website
# product has many matches
class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=True)
    website_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("websites.id")), nullable=False)
    website_rel = db.relationship("Website", back_populates="product_rel")
    match_rel = db.relationship("Match", back_populates="product_rel", cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "website_id": self.website_id,
            "website": self.website_rel.to_dict(),
            "matches": [match.to_dict() for match in self.match_rel]
        }
        
