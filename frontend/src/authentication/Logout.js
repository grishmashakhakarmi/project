import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { getAPI } from "../axios-api";
import { AuthContext } from "../App";
const Logout = () => {
  const { setAuthContext } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const redirectUser = () => {
    if (redirect) {
      return <Navigate to="/login" />;
    }
  };
  getAPI
    .get("/logout")
    .then((response) => {
      localStorage.setItem("jwt", null);
      setAuthContext(null);
      setRedirect(true);
    })
    .catch((err) => {
      console.log(err, "error when logging out");
    });
  return <>{redirectUser()}</>;
};

export default Logout;
