import React from "react";
import "./BreadcrumbOption.scss";
import { useNavigate } from "react-router-dom";

export default function BreadcrumbOption({ cateList, seriesName }) {
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
              {cateList?.map((cate) => {
                return (<a key={cate.id} onClick={() => navigate(`/category/${cate?.id}`)}>{cate?.name}</a>)
              })}
              <span>
                {seriesName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
