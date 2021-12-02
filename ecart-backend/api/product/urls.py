"""Product app module docstring

Author: Varun
"""

from rest_framework import routers

from django.urls import path, include

from . import views

# routes for product

router = routers.DefaultRouter()
router.register(r'', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls))
]
