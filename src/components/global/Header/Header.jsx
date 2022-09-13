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


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [historyToday, setHistoryToday] = useState([])
  const [historyEarlier, setHistoryEarlier] = useState([])

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
    setLoading(true)
    const resGetHistory = await APIGetHistoriesSeriesUserLogging();
    if (resGetHistory?.status === 200) {
      const updateListAction = HistoryActions.updateList(resGetHistory.data);
      dispatch(updateListAction);
    }
    setLoading(false)
  };

  const sortHistory = () => {
    let historyTodayList = []
    let historyEarlierList = []
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0);

    historyList.map((history) => {
      const historyDate = new Date(history.createAt);
      historyDate.setHours(0, 0, 0, 0);
      if (historyDate.getTime() === currentDate.getTime()) {
        historyTodayList.push(history)
      } else {
        historyEarlierList.push(history)
      }
    })
    setHistoryToday(historyTodayList)
    setHistoryEarlier(historyEarlierList)
  }

  useEffect(() => {
    if (login !== null) {
      loadHistory();
    }
    sortHistory()
  }, []);

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
          <div className="col-lg-8">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="active">
                    <a onClick={() => navigate("/")}>Homepage</a>
                  </li>
                  <li>
                    <a>
                      Categories <span className="arrow_carrot-down" />
                    </a>
                    <ul className="dropdown">
                      <li>
                        Cate 1
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a onClick={() => navigate("/history")}>
                      History <span className="arrow_carrot-down" />
                    </a>
                    <HistoryDropdown historyToday={historyToday} historyEarlier={historyEarlier} />
                  </li>
                  <li>
                    <a onClick={() => navigate("/blog")}>Our Blog</a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/")}>Contacts</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header__right">
              <a href="#" className="search-switch searchIcon">
                <span className="icon_search" />
              </a>

              <a className="myProfile">
                <Dropdown>
                  <Dropdown.Toggle
                    className="icon_profile text-white mb-2"
                    variant="transparent"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu className="bg-danger">
                    {login !== null ? (<React.Fragment>
                      <Dropdown.Item onClick={() => navigate("/profile")}>
                        <div className="headerUserAvatar d-flex ">
                          {username}
                          <div className="avatar">
                            <img src={avatar} alt />
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleLogout()}>
                        Log out
                      </Dropdown.Item>
                    </React.Fragment>) : (<React.Fragment>
                      <Dropdown.Item onClick={() => navigate("/signup")}>
                        Sign Up
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate("/login")}>
                        Log In
                      </Dropdown.Item>
                    </React.Fragment>)}
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
