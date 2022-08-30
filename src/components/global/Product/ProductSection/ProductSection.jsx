import React from "react";
import "./ProductionSection.scss";
import { useNavigate } from "react-router-dom";

export default function ProductSection({ data }) {
  const navigate = useNavigate();
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div onClick={() => navigate("/details")} className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{
            backgroundImage: `url("${data.image}")`,
          }}
        >
          <div className="ep">18 / 18</div>
          <div className="comment">
            <i className="fa fa-comments" /> 11
          </div>
          <div className="view">
            <i className="fa fa-eye" /> 9141
          </div>
        </div>
        <div className="product__item__text">
          <ul>
            <li>Active</li>
            <li>Movie</li>
          </ul>
          <h5>
            <a href="#">{data.title}</a>
          </h5>
        </div>
      </div>
    </div>
  );
}
