"""Payment app module docstring

Author: Varun
"""

from django.apps import AppConfig


class PaymentConfig(AppConfig):
    """Configuration class for Payment app."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.payment'
