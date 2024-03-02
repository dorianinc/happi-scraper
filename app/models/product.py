from datetime import date
from .db import db, environment, SCHEMA, add_prefix_for_prod



class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    img_src = db.Column(db.Text, nullable=True)
    avg_price = db.Column(db.Float, nullable=True)
    matches = db.relationship("Match", back_populates="product", cascade="all, delete-orphan")
    creation_date = db.Column(db.DateTime, nullable=False, default=date.today())

    def to_dict(self, include_matches=True):
        product_dict = {
            "id": self.id,
            "name": self.name,
            "img_src": self.img_src,
            "avg_price": self.avg_price
        }
        if len(self.matches):
            product_dict["img_src"] = self.matches[0].to_dict()["img_src"]
        if include_matches:
            product_dict["matches"] = [match.to_dict() for match in self.matches]
        return product_dict

