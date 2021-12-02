"""Api config for app"""

from django.apps import AppConfig


class ApiConfig(AppConfig):
    """
    ApiConfig: Contains api application related configurations.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
