from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import NumberRange, Optional


class WebsiteForm(FlaskForm):
    excluded = IntegerField("Excluded", validators=[Optional()])