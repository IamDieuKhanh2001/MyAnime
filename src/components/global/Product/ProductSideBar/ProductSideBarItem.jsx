import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProductSideBarItem({ data }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/details/${data.id}`)}
            className="product__sidebar__view__item set-bg mix day"
            style={{
                display: "",
                backgroundImage: `url(${data?.image})`,
            }}
        >
            <div className="ep">{data?.totalEpisode}</div>
            <div className="view">
                <i className="fa fa-eye" /> {data?.statisticsViewTotal}
            </div>
            <h5>
                <a href="">{data?.name}</a>
            </h5>
        </div>
    )
}

export default ProductSideBarItem
