from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import DataRequired


class SettingForm(FlaskForm):
    similarity_threshold = IntegerField("Similarity Threshold")
    filter_limit = IntegerField("Filter Limit")
    select_highest = IntegerField("Select highest")
    dark_mode = IntegerField("Dark Mode")