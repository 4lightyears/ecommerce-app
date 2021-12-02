"""
author: varun
"""

from rest_framework.test import APITestCase

from .models import CustomUser

# Create your tests here.


class UserAPITestCase(APITestCase):
    """A class for unit-testing the user API endpoints."""

    def setUp(self):
        """set up the data for test"""

        CustomUser.objects.create(
            name='Jon doe',
            password='1234',
            email='jondoe@gmail.com'
        )

        print(CustomUser.objects.get(name='Jon doe').id)

    def test_sign_in_user(self):
        """test sign in user functionality"""

        url = 'http://localhost:8000/api/v1/user/login/'
        data = {
            'username': 'jondoe@gmail.com',
            'password': '1234'
        }
        response = self.client.post(
            url, data, format='multipart')
        self.assertEqual(response.status_code, 200)
        print(CustomUser.objects.get(name='Jon doe').session_token)

    def test_sign_up_user(self):
        """test sign up user functionality"""

        url = 'http://localhost:8000/api/v1/user/'
        data = {
            'name': 'jon',
            'email': 'jon@gmai.com',
            'password': '1234'
        }
        response = self.client.post(
            url, data, format='json'
        )
        self.assertEqual(response.status_code, 201)

    def test_sign_out_user(self):
        """test sign out user"""

        url = 'http://localhost:8000/api/v1/user/logout/3/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
