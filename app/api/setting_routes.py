from flask import Blueprint, request, make_response, jsonify
from app.models import db, Setting
from app.forms import SettingForm


setting_routes = Blueprint("settings", __name__)

# -----------------------------helper function---------------------------------------#


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages
# ------------------------------------------------------------------------------------#


@setting_routes.route("", methods=['GET'])
def get_settings():
    """"Get Settings"""
    settings = Setting.query.first()
    if not settings:
        error = make_response("Settings are not available")
        error.status_code = 404
        return error
    return settings.to_dict()


@setting_routes.route("/dark_mode", methods=['GET'])
def get_dark_mode():
    """"Get Settings"""
    settings = Setting.query.first().to_dict()
    dark_mode = {"dark_mode": settings["dark_mode"]}
    if not settings:
        error = make_response("Settings are not available")
        error.status_code = 404
        return error
    return dark_mode


@setting_routes.route("", methods=["PUT"])
def update_settings():
    """Update Settings"""
    # ------------ validation -------------#
    settings = Setting.query.first()
    if not settings:
        error = make_response("Settings are not available")
        error.status_code = 404
        return error
    # # --------------------------------------#
    form = SettingForm()
    csrf_token = request.cookies["csrf_token"]
    form["csrf_token"].data = csrf_token
    if form.validate_on_submit():

        data = form.data
        for key, value in vars(settings).items():
            if key in data and data[key] is not None:
                setattr(settings, key, data[key])
            else:
                setattr(settings, key, value)
        db.session.commit()
        return settings.to_dict()
    errors = validation_errors_to_error_messages(form.errors)
    print("FORM ERRORS 👉👉 ", errors)
    return {"errors": errors}, 400
