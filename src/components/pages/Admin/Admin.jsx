import React, { useState } from "react";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";

export default function Admin() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div
            className="admin"
            style={{
                padding: "0px 0px 0px 310px",
            }}
        >
            <SideBar
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
            />
            <Outlet />
        </div>
    );
}
