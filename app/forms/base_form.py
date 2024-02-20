import os
from datetime import timedelta
from flask_wtf import FlaskForm
from wtforms.csrf.session import SessionCSRF

class BaseForm(FlaskForm):
    class Meta:
        csrf = True  # Enable CSRF
        csrf_class = SessionCSRF # Set the CSRF implementation
        csrf_secret = b'EPj00jpfj8Gx1SjnyLxwBBSQfnQ9DJYe0Ym' # Set your CSRF secret key here
        csrf_time_limit = timedelta(minutes=20) # Specify the expiration time for CSRF tokens