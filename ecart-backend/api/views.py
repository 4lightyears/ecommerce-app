"""views for api app go here"""

from django.http import JsonResponse


def home(request):
    """A simple function to test the working of app. Not being used"""
    return JsonResponse({
        'info': 'django_react_test',
        'name': 'host'
    })
