"""Serializer for category app"""

from rest_framework import serializers

from .models import Category


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    """
    CategorySerializer: Serializer class for Category app.
    """

    class Meta:
        """Meta class for setting additional information"""
        model = Category
        fields = ('name', 'description')
