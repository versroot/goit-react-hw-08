import React from "react";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectAuthUser } from "../../redux/auth/slice";
// import "./AppBar.css";

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectAuthUser);

  return (
    <header className="app-bar">
      <Navigation />
      {isLoggedIn ? <UserMenu user={user} /> : <AuthNav />}
    </header>
  );
}
