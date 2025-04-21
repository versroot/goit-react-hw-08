import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/slice";

export default function RestrictedRoute({
  children,
  redirectTo = "/contacts",
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
}
