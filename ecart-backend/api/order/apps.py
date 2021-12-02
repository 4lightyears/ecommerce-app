"""Order app module docstring

Author: Varun
"""

from django.apps import AppConfig


class OrderConfig(AppConfig):
    """Configuration class for Order app."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.order'
