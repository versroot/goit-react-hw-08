import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/auth/slice";
import { logout } from "../../redux/auth/operations";
// import "./UserMenu.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="user-menu">
      <span className="user-menu__name">Hello, {user.name || user.email}!</span>
      <button className="user-menu__logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
