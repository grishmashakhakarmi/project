import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../App.js";
import {isAuthenticated} from '../authentication/auth'
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const { authContext } = useContext(AuthContext);
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Help
        </Link>
<div className="nav-buttons">
  {(location.pathname === "/") ? (<div className="search-form" id="geocoder"></div>) : ""}
            </div>
        {authContext && isAuthenticated() ? (
          <>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapseContent" aria-controls="navbarCollapseContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="nav-main">

            <div className="collapse navbar-collapse" id="navbarCollapseContent">
              <ul className="navbar-nav me-auto b-2 mb-lg-0">
                <li className="nav-item">
                  <button type="button" className="btn btn-primary me-1">
                    Notifications <span className="badge">0</span>
                  </button>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle me-1"
                      id="AccountDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Account
                      <span className="visually-hidden"></span>
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="AccountDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/logout">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
