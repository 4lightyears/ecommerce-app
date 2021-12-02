"""Order app module docstring

Author: Varun
"""

from rest_framework import serializers

from .models import Order


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer class for Order app.
    """
    class Meta:
        """
        Meta class for additional settings
        """
        model = Order
        fields = ('user')
