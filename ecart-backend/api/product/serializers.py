"""Product app module docstring

Author: Varun
"""

from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer class for Order app."""
    image = serializers.ImageField(
        max_length=None, allow_empty_file=False, allow_null=True, required=False)

    class Meta:
        """Additional settings for product serializer"""
        model = Product
        fields = ('id', 'name', 'description', 'price', 'image', 'category')
