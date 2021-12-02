import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

import MainNavigation from "../core/MainNavigation";
import PageFooter from "../core/PageFooter";

import classes from "./styles/Signin.module.css";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, success, loading } = values;

  const handleChange = (name) => (event) => {
    // set values on change in values
    setValues({
      ...values,
      name: name,
      error: false,
      [name]: event.target.value,
    });
  };

  var nameVal;
  const onSubmit = (event) => {
    //handle sumbit event on submitting the signin form.

    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        if (data.token) {
          authenticate(data, () => {
            nameVal = data.user.name;
            localStorage.setItem("name", nameVal);
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
            error: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const performRedirect = () => {
    // perform the redirect to the homepage.
    if (isAuthenticated()) {
      return <Redirect to={{ pathname: "/", state: values }} />;
    }
  };

  const loadingMessage = () => {
    // message to show when processing request.

    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    // message to display when login credentials are fine.

    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully. Please{" "}
            <Link to="/signin">sign-in</Link>.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    // message to display when login is not successful.
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all the fields and try again
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    // the actual sign in form
    return (
      <div className={classes.signinForm}>
        <form>
          <div className={classes.formLegend}>
            <legend>
              <h2>SIGN-IN FORM</h2>
            </legend>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handleChange("email")}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={handleChange("password")}
            />
          </div>
          <div className={classes.signinSubmit}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <MainNavigation avatarName={"foo"}>
      {errorMessage()}
      {successMessage()}
      {loadingMessage()}
      {signInForm()}
      {performRedirect()}
      <PageFooter />
    </MainNavigation>
  );
};

export default Signin;
