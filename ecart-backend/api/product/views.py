"""Product app module docstring

Author: Varun
"""

from rest_framework import viewsets

from .serializers import ProductSerializer
from .models import Product


class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet class for Product app."""
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
