import React from "react";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="footer__logo">
              <a onClick={() => navigate("/")}>
                <img src="img/logo.png" alt="true" />
              </a>
            </div>
          </div>
          <div className="col-lg-7"></div>
          <div className="col-lg-3">
            <div className="footer__right">
              <p>© 2022 All rights reserved</p>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap" />
      </div>
    </div>
  );
}
