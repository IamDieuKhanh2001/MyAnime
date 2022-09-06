import React from "react";
import "./Header.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../api/redux/slices/userSlice";
import { useDispatch } from "react-redux";


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = window.sessionStorage.getItem("jwt");
  const username = window.sessionStorage.getItem("username");
  const avatar = window.sessionStorage.getItem("avatar");

  const handleLogout = () => {
    window.sessionStorage.clear();
    const logoutAction = userActions.resetUserInfo();
    dispatch(logoutAction);
    navigate("/login1");
  };

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
                        <a onClick={() => navigate("/category")}>Categories</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/details")}>
                          Anime Details
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/watching")}>
                          Anime Watching
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/blog-detail")}>
                          Blog Details
                        </a>
                      </li>
                    </ul>
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
