import React from "react";
import "./BreadcrumbOption.scss";
import { useNavigate } from "react-router-dom";

export default function BreadcrumbOption() {
  const navigate = useNavigate();
  return (
    <div className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb__links">
              <a onClick={() => navigate("/")}>
                <i className="fa fa-home" /> Home
              </a>
              <a onClick={() => navigate("/category")}>Categories</a>
              <a onClick={() => navigate("/category")}>Romance</a>
              <span onClick={() => navigate("/watching")}>
                Fate Stay Night: Unlimited Blade
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
