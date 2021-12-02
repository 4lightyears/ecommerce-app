"""Category viewset file"""

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework import viewsets

from .serializers import CategorySerializer
from .models import Category


class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet class for Category app."""
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


@csrf_exempt
def get_all_categories(request):
    """get_all_categories: custom method for returning all the categories with their id values."""

    query = Category.objects.all().order_by('name')
    categories_list = list(query.values())
    return JsonResponse(categories_list, safe=False)
