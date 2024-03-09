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


@setting_routes.route("/", methods=['GET'])
def get_settings():
    """"Get Settings"""
    settings = Setting.query.first()
    if not settings:
        error = make_response("Settings are not available")
        error.status_code = 404
        return error
    return settings.to_dict()


@setting_routes.route("/update", methods=["PUT"])
def update_settings():
    """Update Settings"""
    data = request.get_json()
    print("csrf 👉👉 ", request.cookies["csrf_token"])
    # ------------ validation -------------#
    settings = Setting.query.first()
    print("in settings updater", settings.to_dict())
    if not settings:
        print("failed in conditional 1")
        error = make_response("Settings are not available")
        error.status_code = 404
        return error
    # # --------------------------------------#
    print("csrf 👉👉 in update setting", request.cookies["csrf_token"])
    form = SettingForm()
    print(f"form 👉👉 {form}")
    csrf_token = request.cookies["csrf_token"]
    form["csrf_token"].data = csrf_token
    if form.validate_on_submit():

        data = form.data
        print(f"data 👉👉 {data}")
        settings.similarity_threshold = data["similarity_threshold"]
        settings.filter_limit = data["filter_limit"]
        settings.select_highest = data["select_highest"]
        settings.dark_mode = data["dark_mode"]
        db.session.commit()
        return settings.to_dict()
    errors = validation_errors_to_error_messages(form.errors)
    print("FORM ERRORS ==> ", errors)
    return {"errors": errors}, 400
