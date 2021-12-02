"""Payment app module docstring

Author: Varun
"""

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

import braintree

import environ

env = env = environ.Env()
# read env file
environ.Env.read_env()

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id=env('MERCHANT_ID'),
        public_key=env('PUBLIC_KEY'),
        private_key=env('PRIVATE_KEY')
    )
)


def validate_user_session(id, token):
    """Checks if the session token of the user is the same as in the db."""
    user_model = get_user_model()

    try:
        user = user_model.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except user_model.DoesNotExist:
        return False


@csrf_exempt
def generate_token(request, id, token):
    """Generates client token for braintree.

        Parameters:
        id (int): id of the user.
        token (string): current session token.

        Returns:
        JsonResponse: object
    """
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'invalid session. please login again,'})

    return JsonResponse({
        'clientToken': gateway.client_token.generate(), 'success': True
    })


@csrf_exempt
def process_payment(request, id, token):
    """Processes the payement made by the user.

        Parameters:
        id (int): id of the user.
        token (string): current session token.

        Returns:
        JsonResponse: object
    """
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'invalid session. please login again,'})

    nonce_from_the_client = request.POST['paymentMethodNonce']
    amount_from_the_client = request.POST['amount']

    result = gateway.transaction.sale({
        'amount': amount_from_the_client,
        'payment_method_nonce': nonce_from_the_client,
        'options': {
            "submit_for_settlement": True
        }
    })

    if result.is_success:
        return JsonResponse({
            'success': result.is_success,
            'transaction': {
                'id': result.transaction.id,
                'amount': result.transaction.amount
            }
        })
    else:
        return JsonResponse({'error': True, 'success': False})
