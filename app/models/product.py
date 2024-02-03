from .db import db, environment, SCHEMA, add_prefix_for_prod

# product has many websites
class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    img_src = db.Column(db.Text, nullable=True)
    website_rel = db.relationship(
        "Website", back_populates="product_rel", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "img_src": self.img_src,
            "websites": [website.to_dict() for website in self.website_rel]
        }
