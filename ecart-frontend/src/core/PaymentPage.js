import React from "react";

import PaymentB from "./PaymentB";
import MainNavigation from "./MainNavigation";
import PageFooter from "./PageFooter";

import { loadCart } from "./helper/cartHelper";

import classes from "./styles/PaymentPage.module.css";

const PaymentPage = () => {
  const cartItems = loadCart();

  return (
    <MainNavigation>
      <div className={classes.PaymentBContainer}>
        <h1>Welcome to checkout</h1>
        <PaymentB products={cartItems} />
      </div>
      <PageFooter />
    </MainNavigation>
  );
};

export default PaymentPage;
