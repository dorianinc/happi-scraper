from .db import db, environment, SCHEMA, add_prefix_for_prod

# website has many products
class Website(db.Model):
    __tablename__ = "websites"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    url = db.Column(db.Text, nullable=False)
    product_rel = db.relationship("Product", back_populates="website_rel",  cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "products": [product.to_dict() for product in self.product_rel]
        }