import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signUp } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { firstName, email, password, error, success } = values;

  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ firstName, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        }
        setValues({
          ...values,
          firstName: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      })
      .catch((err) => console.log("signup comp error"));
  };

  const sucessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully, Please
            <Link to="/signin">Sign in</Link> here.
          </div>
        </div>
      </div>
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

  const signUpForm = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <form>
          <div className="form-group">
            <label className="text-light">Name</label>
            <input
              onChange={onChangeHandler("firstName")}
              className="form-control"
              type="text"
              value={firstName}
            />
          </div>
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
          <button
            onClick={onSubmitHandler}
            className="btn btn-success btn-block"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
  return (
    <Base title="Sign up Page" description="A page for user to sign up">
      {sucessMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
