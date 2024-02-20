from wtforms import StringField, SubmitField
# from .base_form import BaseForm
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired("Product name is required.")])