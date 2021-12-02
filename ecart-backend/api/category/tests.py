"""
author: Varun
"""
from rest_framework.test import APITestCase

from .models import Category


class CategoryAPITestCase(APITestCase):
    """A class for unit-testing the category API endpoint"""

    def setUp(self):
        """set up the data for test"""

        Category.objects.create(
            name='electronics',
            description='electronics'
        )
        Category.objects.create(
            name='electronics',
            description='electronics'
        )

    def test_get_method(self):
        """test the get method for category"""

        url = 'http://localhost:8000/api/v1/category/all_categories/names/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
