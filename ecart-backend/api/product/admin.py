"""Product app module docstring

Author: Varun
"""

from django.contrib import admin

from .models import Product

# Register your models here.

admin.site.register(Product)
