import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminActions } from "../../../../api/redux/slices/adminSlice";
import { userActions } from "../../../../api/redux/slices/userSlice";
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
        icon: <i className="bx bx-camera-movie"></i>,
        to: "movies",
        section: "movies",
    },
    {
        display: "Series",
        icon: <i className="bx bx-film"></i>,
        to: "series",
        section: "series",
    },
    {
        display: "Episode",
        icon: <i className="bx bx-movie-play"></i>,
        to: "episodes",
        section: "episodes",
    },

    {
        display: "Customer",
        icon: <i className="bx bx-group"></i>,
        to: "customers",
        section: "customers",
    },

    {
        display: "Giftcode",
        icon: <i className='bx bxs-gift'></i>,
        to: "giftcode",
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
    const dispatch = useDispatch();
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
                The Anime
            </div>
            <div className="sidebar__menu">
                {sidebarNavItems.map((item, index) => (
                    <Link
                        to={item.to}
                        key={index}
                        onClick={() => {
                            if (index === sidebarNavItems.length - 1) {
                                dispatch(userActions.resetUserInfo());
                                window.sessionStorage.clear();
                                localStorage.clear();
                            }
                            setActiveIndex(index);
                        }}
                    >
                        <div
                            className={`sidebar__menu__item ${
                                activeIndex === index ? "active" : ""
                            }`}
                        >
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
