from .db import db, environment, SCHEMA, add_prefix_for_prod

# match belongs to one website
class Match(db.Model):
    __tablename__ = 'matches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    img_src = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    url = db.Column(db.Text, nullable=False)
    website_name = db.Column(db.Text, nullable=False)
    similarity_rating = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    website_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('websites.id')), nullable=False)
    product = db.relationship("Product", back_populates="matches")
    website = db.relationship("Website", back_populates="matches")
    

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "img_src": self.img_src,
            "price": self.price,
            "url": self.url,
            "website_name": self.website_name,
            "similarity_rating:": self.similarity_rating,
            "website_id": self.website_id,
            "product_id": self.product_id
        }




### product can have many matches
### website can have many matches
### product and website can share multiple matches
### match belongs to one product and one website
