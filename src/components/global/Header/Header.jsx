import React, { useCallback } from "react";
import "./Header.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../../api/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { APIGetHistoriesSeriesUserLogging } from "../../../api/axios/historyWatchingAPI";
import { useState } from "react";
import { useEffect } from "react";
import { HistoryActions } from "../../../api/redux/slices/HistoryWatchingSlice";
import HistoryDropdown from "./HistoryDropdown/HistoryDropdown";
import CategoryDropdown from "./CategoryDropdown/CategoryDropdown";
import { APIGetAllCategory } from "../../../api/axios/categoryAPI";
import { categorySeriesActions } from "../../../api/redux/slices/categorySeriesSlice";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { Table } from "react-bootstrap";
import { debounce } from "lodash";
import { APIGetProducts } from "../../../api/axios/productAPI";
import { productsActions } from "../../../api/redux/slices/productSlice";
import SearchRecomDropdown from "./SearchRecomDropdown/SearchRecomDropdown";
import { Avatar } from "@mui/material";
import MobileNavBar from "../../pages/Login/MobileNavBar/MobileNavBar";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [historyToday, setHistoryToday] = useState([]);
    const [historyEarlier, setHistoryEarlier] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [searchRecom, setSearchRecom] = useState([]);

    const historyList = useSelector((state) => state.histories.list);

    const login = window.sessionStorage.getItem("jwt");
    const username = window.sessionStorage.getItem("username");
    const avatar = window.sessionStorage.getItem("avatar");

    const handleLogout = () => {
        window.sessionStorage.clear();
        window.localStorage.clear();
        const logoutAction = userActions.resetUserInfo();
        dispatch(logoutAction);
        const clearUserHistory = HistoryActions.clearUserHistory();
        dispatch(clearUserHistory);
        navigate("/login");
    };

    const loadHistory = async () => {
        console.log("Calling api get history");
        setLoading(true);
        const resGetHistory = await APIGetHistoriesSeriesUserLogging();
        if (resGetHistory?.status === 200) {
            const updateListAction = HistoryActions.updateList(
                resGetHistory.data
            );
            dispatch(updateListAction);
        }
        setLoading(false);
    };

    const sortHistory = () => {
        let historyTodayList = [];
        let historyEarlierList = [];
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        historyList.map((history) => {
            const historyDate = new Date(history.createAt);
            historyDate.setHours(0, 0, 0, 0);
            if (historyDate.getTime() === currentDate.getTime()) {
                historyTodayList.push(history);
            } else {
                historyEarlierList.push(history);
            }
        });
        setHistoryToday(historyTodayList);
        setHistoryEarlier(historyEarlierList);
    };

    const loadCategory = async () => {
        console.log("Calling api get category");
        setLoading(true);
        const resGetCategory = await APIGetAllCategory();
        if (resGetCategory?.status === 200) {
            const updateListAction = categorySeriesActions.updateList(
                resGetCategory.data
            );
            dispatch(updateListAction);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (login !== null) {
            loadHistory();
            sortHistory();
        }
        loadCategory();
    }, []);

    const handleSearchDropdown = (e) => {
        setKeyword(e.target.value);
        debounceDropDown(e.target.value);
    };

    const debounceDropDown = useCallback(
        debounce((nextValue) => loadProductByKeyword(nextValue), 1000),
        []
    );

    const loadProductByKeyword = async (keyword) => {
        console.log("calling api get product in search header");
        setSearchRecom([]);
        if (keyword !== "") {
            const resKeyword = await APIGetProducts(1, keyword);
            if (resKeyword.status === 200) {
                setSearchRecom(resKeyword.data);
            }
        }
    };

    const handleSearch = async () => {
        navigate(`/series/search/${keyword}`);
    };

    const languages = [
        {
            code: "en",
            name: "English",
            country_code: "gb",
        },
        {
            code: "vn",
            name: "Việt Nam",
            country_code: "vn",
        },
        {
            code: "jp",
            name: "日本語",
            country_code: "jp",
        },
    ];

    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-1 d-flex align-items-center">
                        <MobileNavBar />
                        <div className="header__logo">
                            <a onClick={() => navigate("/")}>
                                <img src="/img/logo.png" alt="true" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="header__nav ml-5">
                            <nav className="header__menu mobile-menu">
                                <ul>
                                    <li className="active">
                                        <Link to="/">
                                            {t("header.home_page_li")}
                                        </Link>
                                    </li>
                                    <li>
                                        <a>{t("header.category_li")}</a>
                                        <CategoryDropdown />
                                    </li>
                                    <li>
                                        <Link to="/blog">
                                            {t("header.our_blog_li")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/history">
                                            {t("header.history_li")}
                                        </Link>
                                        <HistoryDropdown
                                            historyToday={historyToday}
                                            historyEarlier={historyEarlier}
                                        />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="header__right">
                            <a className="search-switch searchIcon">
                                <div className="d-flex search__field">
                                    <input
                                        name={keyword}
                                        className="searchBar__input"
                                        id="inputEmailAddress"
                                        type="text"
                                        placeholder={t(
                                            "header.search_placeholder"
                                        )}
                                        onChange={handleSearchDropdown}
                                    />
                                    <button
                                        className="buttonSearch"
                                        onClick={() => handleSearch()}
                                    >
                                        <span className="icon_search" />
                                    </button>
                                </div>
                                {searchRecom.length > 0 && (
                                    <SearchRecomDropdown
                                        searchRecom={searchRecom}
                                        setSearchRecom={setSearchRecom}
                                    />
                                )}
                            </a>
                            <a className="languages">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="icon_globe-2 text-white mb-2"
                                        variant="transparent"
                                        id="dropdown-basic"
                                    ></Dropdown.Toggle>
                                    <Dropdown.Menu className="bg-danger">
                                        {languages.map(
                                            ({ code, name, country_code }) => (
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        i18next.changeLanguage(
                                                            code
                                                        )
                                                    }
                                                    key={country_code}
                                                >
                                                    <span
                                                        className={`flag-icon flag-icon-${country_code} mx-2`}
                                                    ></span>
                                                    {name}
                                                </Dropdown.Item>
                                            )
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </a>
                            <a className="myProfile">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="icon_profile text-white mb-2"
                                        variant="transparent"
                                        id="dropdown-basic"
                                    ></Dropdown.Toggle>
                                    <Dropdown.Menu className="bg-danger">
                                        {login !== null ? (
                                            <React.Fragment>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        navigate("/profile")
                                                    }
                                                >
                                                    <div className="headerUserAvatar d-flex justify-content-around align-items-center">
                                                        <Avatar alt="Remy Sharp" src={avatar} />
                                                        {username}
                                                    </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    className="d-flex justify-content-around"
                                                    onClick={() =>
                                                        handleLogout()
                                                    }
                                                >
                                                    <i className="bx bxs-log-out bx-sm"></i>
                                                    {t(
                                                        "header.profile_dropdown.logout"
                                                    )}
                                                </Dropdown.Item>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <Dropdown.Item
                                                    className="d-flex justify-content-around "
                                                    onClick={() =>
                                                        navigate("/login")
                                                    }
                                                >
                                                    <i className="bx bxs-log-in bx-sm"></i>
                                                    {t(
                                                        "header.profile_dropdown.login"
                                                    )}
                                                </Dropdown.Item>
                                            </React.Fragment>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
