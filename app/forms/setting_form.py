from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import NumberRange


class SettingForm(FlaskForm):
    similarity_threshold = IntegerField("Similarity Threshold", validators=[NumberRange(min=1, max=100, message="Threshold must be a value between 1 and 100")])
    filter_limit = IntegerField("Filter Limit", validators=[NumberRange(min=1, max=10, message="Filter Limit must be a value between 1 and 10")])
    select_highest = IntegerField("Select highest")
    dark_mode = IntegerField("Dark Mode")