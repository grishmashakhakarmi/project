import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { getAPI } from "../axios-api";
import { AuthContext } from "../App";

const Login = () => {
  const { authContext, setAuthContext } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    disabled: false,
    error: null,
    redirect: "",
    redirectToUpdateLocation: null,
  });
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const {
    email,
    password,
    error,
    disabled,
    redirect,
    redirectToUpdateLocation,
  } = values;

  const login = (e) => {
    e.preventDefault();
    getAPI
      .post("login/", { email, password })
      .then((response) => {
        const jwt = JSON.stringify(response.data);
        localStorage.setItem("jwt", jwt);
        setAuthContext(jwt);
        setValues({
          ...values,
          error: null,
          disabled: true,
          redirect: true,
          redirectToUpdateLocation: response.data.user.coordinates,
        });
      })
      .catch((err) => {
        setValues({
          ...values,
          error: err.response.data.error,
          redirectToUpdateLocation: null,
        });
      });
  };
  const redirectUser = () => {
    if (authContext && redirect) {
      if (redirectToUpdateLocation) {
        if (
          redirectToUpdateLocation[0] !== 0 &&
          redirectToUpdateLocation[1] !== 0
        ) {
          return <Navigate to="/" />;
        } else {
          return <Navigate to="/update-view" />;
        }
      }
    }
  };
  const showError = () =>
    error && (
      <div
        className="animate__animated animate__fadeInDown container sticky-top mt-5 alert alert-error alert-dismissible fade show"
        role="alert"
        aria-hidden="true"
      >
        {error}
      </div>
    );
  return (
    <>
      {showError()}
      <div
        className="container card shadow-lg position-absolute top-50 start-50 translate-middle p-3 mb-5 bg-body rounded bg-white"
        style={{ width: "30rem" }}
      >
        <main className="form-signin">
          <form type="POST" className="card-body">
            {disabled ? (
              <div className="d-flex justify-content-center mb-3 text-success pt-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <h1 className="h3 mb-3 fw-normal card-title text-center ">
                Login
              </h1>
            )}
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleChange("email")}
                value={email}
                readOnly={disabled ? true : false}
                autoFocus
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <br />
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={handleChange("password")}
                value={password}
                readOnly={disabled ? true : false}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              onClick={login}
              className="w-100 btn btn-lg btn-outline-primary submit-btn"
              type="submit"
              disabled={disabled ? true : false}
            >
              Login
            </button>
            <div className="div-link">
              Don't have account? <Link to="/register">Register</Link>
            </div>
          </form>
        </main>
      </div>
      {redirectUser()}
    </>
  );
};

export default Login;
