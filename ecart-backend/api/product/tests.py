"""
author: Varun
"""

from rest_framework.test import APITestCase

from api.category.models import Category
from .models import Product

# Create your tests here.


class ProductAPITestCase(APITestCase):
    """A class for unit-testing the product API endpoint."""

    def setUp(self):
        """set up the data for test"""

        Category.objects.create(
            name='electronics',
            description='electronics'
        )

        Product.objects.create(
            name='Iron',
            description='Simple Iron',
            price='20.00',
            stock='20',
            is_active=True,
            image='image.jpg',
            category=Category.objects.get(name='electronics')
        )

    def test_get_method(self):
        """test function for assertions"""
        url = 'http://localhost:8000/api/v1/product/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        query_set = Product.objects.filter(name='Iron')
        self.assertEqual(query_set.count(), 1)
