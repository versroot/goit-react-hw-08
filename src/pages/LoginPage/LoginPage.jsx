import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { selectIsLoggedIn } from "../../redux/auth/slice";

export default function LoginPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  // If already logged in, redirect to contacts
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/contacts", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}
