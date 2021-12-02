"""User app module docstring

Author: Varun
"""

from rest_framework import routers

from django.urls import path, include

from . import views

# routes for user

routers = routers.DefaultRouter()
routers.register(r'', views.UserViewSet)

urlpatterns = [
    path('login/', views.signin, name='signin'),
    path('logout/<int:id>/', views.signout, name='signout'),
    path('', include(routers.urls))
]
