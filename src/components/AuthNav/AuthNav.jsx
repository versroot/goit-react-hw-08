import React from "react";
import { NavLink } from "react-router-dom";
// import "./AuthNav.css";

export default function AuthNav() {
  return (
    <div className="auth-nav">
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? "auth-nav__link auth-nav__link--active" : "auth-nav__link"
        }
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "auth-nav__link auth-nav__link--active" : "auth-nav__link"
        }
      >
        Login
      </NavLink>
    </div>
  );
}
