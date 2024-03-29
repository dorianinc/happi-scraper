from flask import Blueprint, request, make_response, jsonify
from backend.models import db, Match
from backend.forms import MatchForm

match_routes = Blueprint("matches", __name__)

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

@match_routes.route("")
def get_all_matches():
    """"Get all trails"""
    matches = Match.query.all()
    return [match.to_dict() for match in matches]z