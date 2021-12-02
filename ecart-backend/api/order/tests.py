"""
author: Varun
"""

from rest_framework.test import APITestCase
from .models import Order

# Create your tests here.


class OrderAPITestCase(APITestCase):
    """
    A class for unit-testing the order API endpoint.
    """

    def setUp(self):
        """set up the data for test"""
        Order.objects.create(
            id=3,
            product_names='Juice, ',
            total_products='1',
            transaction_id='1121',
            total_amount='10.00'
        )

    def test_order_history(self):
        """test order history"""

        url = 'http://localhost:8000/api/v1/order/order_history/3/0/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
