import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/slice";

export default function PrivateRoute({ children, redirectTo = "/login" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
}
