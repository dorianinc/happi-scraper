from flask import Blueprint, request, make_response, jsonify
from app.models import db, Website
from app.forms import WebsiteForm


website_routes = Blueprint("websites", __name__)

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


@website_routes.route("")
def get_all_website():
    """"Get all websites"""
    websites = Website.query.all()
    return [website.to_dict() for website in websites]


@website_routes.route("/<int:website_id>", methods=["PUT"])
def update_website(website_id):
    """Update Website"""
    # ------------ validation -------------#
    print(f"website_id 👉👉 {website_id}")
    website = Website.query.get(website_id)
    if not website:
        error = make_response("Website is not available")
        error.status_code = 404
        return error
    # # --------------------------------------#
    form = WebsiteForm()
    csrf_token = request.cookies["csrf_token"]
    form["csrf_token"].data = csrf_token
    if form.validate_on_submit():

        data = form.data
        for key, value in vars(website).items():
            if key in data and data[key] is not None:
                setattr(website, key, data[key])
            else:
                setattr(website, key, value)
        db.session.commit()
        return website.to_dict()
    errors = validation_errors_to_error_messages(form.errors)
    print("FORM ERRORS ==> ", errors)
    return {"errors": errors}, 400
