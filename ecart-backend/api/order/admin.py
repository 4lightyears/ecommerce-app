"""Order app module docstring

Author: Varun
"""

from django.contrib import admin

from .models import Order

# Register your models here.

admin.site.register(Order)
