import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SideBar.scss";

export const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    to: "/admin",
    section: "",
  },
  {
    display: "Movie",
    icon: <i className="bx bx-film"></i>,
    to: "movies",
    section: "movies",
  },
  {
    display: "Series",
    icon: <i className="bx bx-category"></i>,
    to: "series",
    section: "series",
  },

  {
    display: "Customer",
    icon: <i className="bx bx-group"></i>,
    to: "customers",
    section: "customers",
  },
  {
    display: "Log Out",
    icon: <i className="bx bx-log-out"></i>,
    to: "/login",
    section: "login",
  },
];
export default function Sidebar({ setActiveIndex, activeIndex }) {
  const navigate = useNavigate();
  useEffect(() => {
    const curPath = window.location.pathname.split("/admin")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => "/" + item.section === curPath
    );
    setActiveIndex(curPath.length <= 0 ? 0 : activeItem);
  }, [setActiveIndex, sidebarNavItems]);

  return (
    <div className="sidebar">
      <div onClick={() => navigate("/admin")} className="sidebar__logo">
        ANIME
      </div>
      <div className="sidebar__menu">
        {sidebarNavItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            onClick={() => {
              if (index === sidebarNavItems.length - 1) {
                window.sessionStorage.clear();
              }
              setActiveIndex(index);
            }}
          >
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}