import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProductSideBarItem({ data }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate("/details")}
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
        // <div
        //     onClick={() => navigate("/details")}
        //     className="product__sidebar__view__item set-bg mix years"
        //     style={{
        //         backgroundImage: `url(./img/hero/hero-1.jpg)`,
        //     }}
        // >
        //     <div className="ep">18 / ?</div>
        //     <div className="view">
        //         <i className="fa fa-eye" /> 9141
        //     </div>
        //     <h5>
        //         <a href="">Test item 1</a>
        //     </h5>
        // </div>
    )
}

export default ProductSideBarItem
