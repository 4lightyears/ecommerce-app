"""Product app module docstring

Author: Varun
"""

from django.apps import AppConfig


class ProductConfig(AppConfig):
    """Configuration class for product app."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.product'
