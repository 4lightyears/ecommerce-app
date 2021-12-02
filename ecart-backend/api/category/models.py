"""database model for category app"""

from django.db import models


class Category(models.Model):
    """Database model for Category app."""
    class Meta:
        """Extra settings for display on admin page"""
        verbose_name = 'category'
        verbose_name_plural = 'categories'
        db_table = 'category'

    name = models.CharField(max_length=80)
    description = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)
