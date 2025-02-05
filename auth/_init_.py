from flask import Blueprint

# Create the Blueprint instance for auth routes
auth_bp = Blueprint('auth', __name__)

# Import routes after initializing the Blueprint
from . import routes
