"""User app module docstring

Author: Varun
"""

from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """Database model for Order app. It is a custom model so it extends AbstractUser class."""
    name = models.CharField(max_length=60, default='Anonymous')
    email = models.EmailField(max_length=125, unique=True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)

    session_token = models.CharField(max_length=10, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
