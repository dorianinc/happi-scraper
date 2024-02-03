from .db import db, environment, SCHEMA, add_prefix_for_prod

# match belongs to one product
class Match(db.Model):
    __tablename__ = 'matches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    url = db.Column(db.Text, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    product_rel = db.relationship("Product", back_populates="match_rel")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "price": self.price,
            "url": self.url,
            "product_id": self.product_id,
            "product": self.product_rel.to_dict(),
        }
        
