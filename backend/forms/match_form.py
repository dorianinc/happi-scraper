from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange


class MatchForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(message="Name is required"), Length(
        min=1, max=100, message="Product name must be 1 to 300 characters long")])
    image_src = StringField("Image")
    price = FloatField("Price", validators=[
        DataRequired(message="Price is required")])
    url = StringField("URL")
    website_id = IntegerField("website_id", validators=[
        DataRequired(message="Website ID is required")])
