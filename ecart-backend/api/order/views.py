"""Order app module docstring

Author: Varun
"""
import json

from rest_framework import viewsets

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

from .serializers import OrderSerializer
from .models import Order

# Create your views here.


def validate_user_session(id, token):
    """validate_user_session:
    id: id of user.
    token: session token.
    """

    user_model = get_user_model()
    try:
        user = user_model.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except user_model.DoesNotExist:
        return False


def get_total_products(products):
    """extract total products from the argument"""
    total_count = 0
    product_list = json.loads(products)
    for product in product_list:
        total_count += product['count']

    return total_count


@csrf_exempt
def add(request, id, token):
    """Add order to db"""
    if not validate_user_session(id, token):
        return {'error': 'Please login again.'}

    if request.method == 'POST':
        transaction_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['products']

        # to be fixed. Calculate based on new string value
        # total_pro = len(products.split(',')[:-1])
        total_pro = get_total_products(products)

        user_model = get_user_model()

        try:
            user = user_model.objects.get(pk=id)
        except user_model.DoesNotExist:
            return {'error': 'User does not exist'}

        ordr = Order(
            user=user, product_names=products, total_products=total_pro,
            transaction_id=transaction_id, total_amount=amount
        )

        ordr.save()
        return JsonResponse({
            'success': True,
            'error': 'False',
            'msg': 'order placed successfully.'
        })


@csrf_exempt
def get_orders(request, id, token):
    """GET orders by a user"""
    if request.method != 'GET':
        return {'message': 'Error. Please use get method'}

    if not validate_user_session(id, token):
        return {'error': 'Please login again.'}

    query = Order.objects.filter(user_id=id)
    orders_list = list(query.values())
    return JsonResponse({'orders': orders_list}, safe=False)


class OrderViewSet(viewsets.ModelViewSet):
    """Order viewset"""
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer
