import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../authentication/auth";

function PrivateRoute({ children }: { children: JSX.Element }) {
  let auth = isAuthenticated();
  let location = useLocation();
  if (auth) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
}
export default PrivateRoute;
