from .db import db, environment, SCHEMA, add_prefix_for_prod

class Website(db.Model):
    __tablename__ = "websites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    url = db.Column(db.Text, nullable=False)
    matches = db.relationship("Match", back_populates="website")
    

    def to_dict(self, include_matches=False):
        website_dict = {
            "id": self.id,
            "name": self.name,
            "url": self.url
        }
        return website_dict
