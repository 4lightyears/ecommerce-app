"""User app module docstring

Author: Varun
"""

from django.contrib import admin

from .models import CustomUser

# Register your models here.

admin.site.register(CustomUser)
