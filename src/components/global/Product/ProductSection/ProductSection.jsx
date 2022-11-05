import React from "react";
import "./ProductionSection.scss";
import { useNavigate } from "react-router-dom";

export default function ProductSection({ data }) {
  const navigate = useNavigate();
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div onClick={() => navigate(`/details/${data.id}`)} className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{
            backgroundImage: `url("${data.image}")`,
          }}
        >
          <div className="ep">{data.currentNumberEpisode} / {data.totalEpisode}</div>
          {data.isPremium && (
            <div className="premium">
              <img className="premium__icon" src="/img/icon-premium.svg" alt="true" />
              Premium
            </div>
          )}

          <div className="comment">
            <i className="fa fa-comments" /> {data.commentTotal}
          </div>
          <div className="view">
            <i className="fa fa-eye" /> {data.views}
          </div>
        </div>
        <div className="product__item__text">
          <ul>
            {data.categoryList.map((category, index) => (<li key={index}>{category.name}</li>))}
          </ul>
          <h5>
            <a href="#">{data.seriesName}</a>
          </h5>
        </div>
      </div>
    </div>
  );
}
