from flask import Blueprint, request, make_response, jsonify
from app.models import db, Setting


setting_routes = Blueprint("settings", __name__)

#-----------------------------helper function---------------------------------------#
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages
#------------------------------------------------------------------------------------#

@setting_routes.route("/")
def get_settings():
    """"Get single trail by id"""
    settings = Setting.query.first()
    print(f"settings 👉👉 {settings}")
    if not settings:
        error = make_response("Settings are not available")
        error.status_code = 404
        return error
    return settings.to_dict()