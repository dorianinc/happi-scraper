from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange


class ProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(message="Please enter a product name"), Length(
        min=1, max=100, message="Product name must be 1 to 300 characters long")])
    website_id = StringField("website_id", validators=[
                             DataRequired(message="Website ID is required")])
    submit = SubmitField("Search Products")
