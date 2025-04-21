import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
// import "./Layout.css";

export default function Layout() {
  return (
    <>
      <AppBar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
