"""config settings for category app"""

from django.apps import AppConfig


class CategoryConfig(AppConfig):
    """Configuration class for Category app."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.category'
