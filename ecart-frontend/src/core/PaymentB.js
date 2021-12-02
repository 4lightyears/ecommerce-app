import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import { cartEmpty, totalCost } from "./helper/cartHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated, signout } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const PaymentB = (products, reload = undefined, setReload = (f) => f) => {
  // payment component for Braintree
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const [orderSuccess, setOrderSuccess] = useState(false);

  const userId = isAuthenticated() && isAuthenticated().user.id;
  let token;
  if (isAuthenticated()) {
    token = JSON.parse(localStorage.getItem("token")).token.toString();
  }

  products = JSON.parse(localStorage.getItem("cart"));
  console.log("PAYMENTB, line 32: CART:", products);

  const getToken = (userId, token) => {
    // get the token from the frontend.
    getMeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Redirect to="/" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, [userId, token]);

  const onPurchase = () => {
    // function to be executed when the purchase button is clicked.
    setInfo({ loading: true });
    let nonce;
    info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: totalCost(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          if (response.error) {
            if (response.code === "1") {
              signout(() => {
                return <Redirect to="/" />;
              });
            }
          } else {
            setInfo({ ...info, success: response.success, loading: true });
            setOrderSuccess(true);

            let product_names = JSON.stringify(products);

            const orderData = {
              products: product_names,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData)
              .then((response) => {
                if (response.error) {
                  if (response.code === "1") {
                    signout(() => {
                      return <Redirect to="/" />;
                    });
                  }
                } else {
                  if (response.success === true) {
                    console.log("ORDER PLACED!!");
                  }
                }
              })
              .catch((error) => {
                setInfo({ loading: false, success: false });
                console.log("Order FAILED", error);
              });
            cartEmpty(() => {});

            setReload(!reload);
          }
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
        });
    });
  };

  const successMessage = () => {
    // message to display when order was successfully created.

    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: orderSuccess ? "" : "none" }}
          >
            New order created successfully. Go back to <Link to="/">Home</Link>.
          </div>
        </div>
      </div>
    );
  };

  const purchaseButton = info.loading ? (
    <button onClick={onPurchase} className="btn btn-block btn-success" disabled>
      Buy Now
    </button>
  ) : (
    <button onClick={onPurchase} className="btn btn-block btn-success">
      Buy Now
    </button>
  );

  const showbtnDropIn = () => {
    // web dropin for braintree
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            {purchaseButton}
          </div>
        ) : (
          <h3>Please login first or add something in cart</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      {orderSuccess && successMessage()}
      <h3>Your bill is $ {totalCost()}</h3>
      {showbtnDropIn()}
    </div>
  );
};

export default PaymentB;
