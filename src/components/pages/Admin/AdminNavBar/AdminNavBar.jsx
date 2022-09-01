import React from "react";
import "./AdminNavBar.scss";
import SideBar from "./SideBar/SideBar";
import TopBar from "./TopBar/TopBar";
import "./AdminNavBar.scss";

export default function AdminNavBar({ children }) {
  return (
    <div className="adminNavBar">
      <SideBar/>
      <div className="navBarContent">
        <TopBar/>
        {children}
      </div>
    </div>
  );
}
