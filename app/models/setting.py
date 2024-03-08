from .db import db, environment, SCHEMA, add_prefix_for_prod



class Setting(db.Model):
    __tablename__ = 'settings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    similarity_threshold = db.Column(db.Integer, default=80, nullable=False)
    filter_limit = db.Column(db.Integer, default=5, nullable=False)
    select_all = db.Column(db.Boolean, default=True, nullable=False)
    select_highest = db.Column(db.Boolean, default=False, nullable=False)
    dark_mode = db.Column(db.Boolean, default=True, nullable=False)

    def to_dict(self):
        settings_dict = {
            "similarity_treshhold": self.similarity_threshold,
            "filter_limit": self.filter_limit,
            "select_all": self.select_all,
            "select_highest": self.select_highest,
            "dark_mode": self.dark_mode
        }