from .db import db, environment, SCHEMA, add_prefix_for_prod

# website belongs to one products
# website has many matches
class Website(db.Model):
    __tablename__ = "websites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    url = db.Column(db.Text, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id")), nullable=False)
    product_rel = db.relationship("Product", back_populates="website_rel")
    match_rel = db.relationship(
        "Match", back_populates="website_rel", cascade="all, delete-orphan")

    def to_dict(self, includeMatches=False):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "product_id": self.product_id,
            "product": self.product_rel.to_dict(),
            "matches": [match.to_dict() for match in self.match_rel] if includeMatches else None
        }
