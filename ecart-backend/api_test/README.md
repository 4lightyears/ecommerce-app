# API Endpoints

You can find the list of API endpoints below and what each of them do.

- [GET] api/v1/category/all_categories/names - Get a list of all the categories available for the products.
- [GET] api/v1/product/ - Get a list of all the products.
- [POST] api/v1/user/login/ - Sign a user in after making a post request with email and password in the form data.
- [GET] api/v1/user/logout/<user_id>/ - Sign a user out.
- [GET] api/v1/product/category/<category_id>/ - Get all the products from a category based on category id.
- [GET] api/v1/order/order_history/<user_id>/<auth_token>/ - Get order history for a particular user.
