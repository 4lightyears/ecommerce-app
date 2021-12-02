"""User app module docstring

Author: Varun
"""

import random
import re

from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from django.http import JsonResponse
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt

from .serializers import UserSerializer
from .models import CustomUser


def generate_session_token(length=10):
    """Generates a session token.

    Parameters:
    length (int): length of the session token.

    Returns:
    str: session token.
    """
    return ''.join(
        random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length)
    )


@csrf_exempt
def signin(request):
    """signs the user in based on the credentials."""
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid parameters.'})

    username = request.POST.get('email')
    password = request.POST.get('password')

    # validation part
    if not re.match('^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$', str(username)):
        return JsonResponse({'error': 'enter a valid email address.'})

    if len(password) < 3:
        return JsonResponse({
            'error': 'Password needs to be at least 3 characters long.'
        },
            status=403
        )

    user_model = get_user_model()

    try:
        user = user_model.objects.get(email=username)
        if user.check_password(password):
            user_dict = user_model.objects.filter(
                email=username).values().first()
            user_dict.pop('password')

            # session check
            if user.session_token != '0':
                user.session_token = '0'
                user.save()
                return JsonResponse({'error': 'previous session exists.'})

            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user': user_dict}, status=200)
        else:
            return JsonResponse({'error': 'invalid password.'})

    except user_model.DoesNotExist:
        return JsonResponse({'error': 'Invalid email.'})


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet class for User app."""
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        """Gets the permissions."""
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]


@csrf_exempt
def signout(request, id):
    """Signs the user out.

        Parameters:
        id (int): id of the user.

        Returns:
        JsonResponse: object
    """
    logout(request)

    user_model = get_user_model()

    try:
        user = user_model.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except user_model.DoesNotExist:
        return JsonResponse({'error': 'Invalid user id.'})

    return JsonResponse({'message': 'logout success'})
