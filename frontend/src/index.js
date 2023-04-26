import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "animate.css";



/*
setup .env in frontend
REACT_APP_API=http://localhost:8000/api
REACT_APP_SOCKET_API=http://localhost:8000
REACT_APP_MAPBOX_ACCESS_TOKEN=
BROWSER=none

*/
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>);
