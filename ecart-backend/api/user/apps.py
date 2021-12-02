"""User app module docstring

Author: Varun
"""

from django.apps import AppConfig


class UserConfig(AppConfig):
    """Configuration class for User app."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.user'
