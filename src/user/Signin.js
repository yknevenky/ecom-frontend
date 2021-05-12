import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signIn, isAuthenticated, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: "",
    didRedirect: false,
  });

  const { email, password, loading, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Oops something went wrong, please try again, {error}
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
    });
    signIn({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={onChangeHandler("email")}
                className="form-control"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={onChangeHandler("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign in Page" description="A page for user to sign in">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
