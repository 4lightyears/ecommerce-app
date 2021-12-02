import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/SignUp";
import Signin from "./user/SignIn";
import Profile from "./user/Profile";
import PaymentPage from "./core/PaymentPage";

const Routes = () => {
  // contains all the routes for the application

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" />
        <Route path="/payment" component={PaymentPage} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
