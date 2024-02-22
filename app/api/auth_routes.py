from flask import Blueprint, jsonify, session, request
from flask_wtf.csrf import generate_csrf

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages


@auth_routes.route('/generate-token', methods=['GET'])
def generate_csrf_token():
    csrf_token = session.get('csrf_token')
    if not csrf_token:
        csrf_token = generate_csrf()
        response = jsonify({'csrf_token': csrf_token})
        response.set_cookie('csrf_token', csrf_token, httponly=True)
        return response
    return jsonify({'csrf_token': None})