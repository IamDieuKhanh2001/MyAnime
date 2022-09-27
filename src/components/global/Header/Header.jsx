import React from "react";
import "./Header.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
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
import SearchOverlay from "./SearchOverlay/SearchOverlay";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [historyToday, setHistoryToday] = useState([]);
  const [historyEarlier, setHistoryEarlier] = useState([]);


  const historyList = useSelector((state) => state.histories.list);

  const login = window.sessionStorage.getItem("jwt");
  const username = window.sessionStorage.getItem("username");
  const avatar = window.sessionStorage.getItem("avatar");

  const handleLogout = () => {
    window.sessionStorage.clear();
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
      const updateListAction = HistoryActions.updateList(resGetHistory.data);
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
      const updateListAction = categorySeriesActions.updateList(resGetCategory.data);
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

  const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      code: 'vn',
      name: 'Việt Nam',
      country_code: 'vn',
    },
    {
      code: 'jp',
      name: '日本語',
      country_code: 'jp',
    },
  ]

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <a onClick={() => navigate("/")}>
                <img src="/img/logo.png" alt="true" />
              </a>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="active">
                    <a onClick={() => navigate("/")}>{t('header.home_page_li')}</a>
                  </li>
                  <li>
                    <a>{t('header.category_li')}</a>
                    <CategoryDropdown />
                  </li>
                  <li>
                    <a onClick={() => navigate("/blog")}>{t('header.our_blog_li')}</a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/history")}>{t('header.history_li')}</a>
                    <HistoryDropdown
                      historyToday={historyToday}
                      historyEarlier={historyEarlier}
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="header__right">
              <a className="search-switch searchIcon">
                <SearchOverlay />
              </a>
              <a className="languages">
                <Dropdown>
                  <Dropdown.Toggle
                    className="icon_globe-2 text-white mb-2"
                    variant="transparent"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu className="bg-danger">
                    {languages.map(({ code, name, country_code }) => (
                      <Dropdown.Item onClick={() => i18next.changeLanguage(code)} key={country_code}>
                        <span className={`flag-icon flag-icon-${country_code} mx-2`}></span>
                        {name}
                      </Dropdown.Item>
                    ))}
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
                        <Dropdown.Item onClick={() => navigate("/profile")}>
                          <div className="headerUserAvatar d-flex ">
                            {username}
                            <div className="avatar">
                              <img src={avatar} alt />
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex justify-content-between" onClick={() => handleLogout()}>
                          <i class='bx bxs-log-out bx-sm'></i>
                          {t('header.profile_dropdown.logout')}
                        </Dropdown.Item>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Dropdown.Item className="d-flex justify-content-between" onClick={() => navigate("/signup")}>
                          <i class='bx bx-window-open bx-sm'></i>
                          {t('header.profile_dropdown.signup')}
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex justify-content-between" onClick={() => navigate("/login")}>
                          <i class='bx bxs-log-in bx-sm'></i>
                          {t('header.profile_dropdown.login')}
                        </Dropdown.Item>
                      </React.Fragment>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

              </a>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap" />
      </div>
    </div>
  );
}
