"""User app module docstring

Author: Varun
"""

from rest_framework import serializers

from .models import CustomUser


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer class for Order app."""

    def create(self, validated_data):
        """create function for serializer"""
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        """update function for serializer"""
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)

        instance.save()
        return instance

    class Meta:
        """Meta class for additional settings"""
        model = CustomUser
        extra_kwags = {'password': {'write_only': True}}
        fields = (
            'name', 'email', 'password', 'phone', 'gender', 'is_active', 'is_staff', 'is_superuser'
        )
