"""Order app module docstring

Author: Varun
"""

from rest_framework import routers

from django.urls import path, include

from . import views

# routes for order

router = routers.DefaultRouter()
router.register(r'', views.OrderViewSet)

urlpatterns = [
    path('add/<str:id>/<str:token>/', views.add, name='order.add'),
    path('', include(router.urls)),
    path('order_history/<str:id>/<str:token>/',
         views.get_orders, name='orders.get_orders'),
]
