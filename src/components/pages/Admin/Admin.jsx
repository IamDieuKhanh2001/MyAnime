import React from "react";
import { Outlet } from "react-router-dom";
import "./Admin.scss";
import AdminNavBar from "./AdminNavBar/AdminNavBar";

export default function Admin() {
  return (
    <div className="admin">
      <AdminNavBar>
        <Outlet />
      </AdminNavBar>
    </div>
  );
}
