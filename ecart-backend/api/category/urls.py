"""urls and configurations for category app"""

from rest_framework import routers
from django.urls import path, include

from . import views

# routes for category

router = routers.DefaultRouter()
router.register(r'', views.CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('all_categories/names/', views.get_all_categories)
]
