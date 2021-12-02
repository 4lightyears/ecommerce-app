"""Payment app module docstring

Author: Varun
"""

from django.urls import path

from . import views

# routes for payment

urlpatterns = [
    path('gettoken/<str:id>/<str:token>/',
         views.generate_token, name='token.generate'),
    path('process/<str:id>/<str:token>/',
         views.process_payment, name='payment.process'),
]
