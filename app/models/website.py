class Website(db.Model):
    __tablename__ = "websites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)  # Name of the website
    url = db.Column(db.Text, nullable=False)  # URL of the website
    search_bar_locator = db.Column(db.Text, nullable=True)  # Locator for search bar
    header_locator = db.Column(db.Text, nullable=True)  # Locator for header
    price_locator = db.Column(db.Text, nullable=True)  # Locator for price
    pop_up_locator = db.Column(db.Text, nullable=True)  # Locator for pop-up if any
    pop_up_check = db.Column(db.Boolean, nullable=False, default=False)  # Flag indicating whether pop-up is checked
    search_button_locator = db.Column(db.Text, nullable=True)  # Locator for search button
    search_button_check = db.Column(db.Boolean, nullable=False, default=False)
    image_locator = db.Column(db.Text, nullable=True)  # Locator for product images
    url_locator = db.Column(db.Text, nullable=True)  # Locator for product URLs
    filter_check = db.Column(db.Boolean, nullable=False, default=False)  # Flag indicating whether result filtering is checked
    excluded = db.Column(db.Boolean, nullable=False, default=False)  # Whether the website is excluded from scraping
    matches = db.relationship("Match", back_populates="website")  # Whether the website supports result filtering

    def to_dict(self, include_matches=False):
        website_dict = {
            "id": self.id,
            "name": self.name, 
            "url": self.url,
            "search_bar_locator": self.search_bar_locator,
            "header_locator": self.header_locator,
            "price_locator": self.price_locator,
            "pop_up_locator": self.pop_up_locator,
            "pop_up_check": self.pop_up_check, 
            "search_button_locator": self.search_button_locator,
            "search_button_check": self.search_button_check,
            "image_locator": self.image_locator,
            "url_locator": self.url_locator,
            "filter_check": self.filter_check,
            "excluded": self.excluded
        }
        if include_matches:
            website_dict["matches"] = [match.to_dict() for match in self.matches]
        return website_dict