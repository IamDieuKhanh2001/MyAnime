import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductSideBarItem from '../ProductSideBar/ProductSideBarItem';

function ProductDetailSideBar() {
    const navigate = useNavigate();

    const relateSeries = useSelector((state) => state.products.list);

    return (
        <div className="anime__details__sidebar">
            <div className="section-title">
                <h5>You also love this</h5>
            </div>
            {relateSeries.map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        className="product__sidebar__view__item set-bg"
                        style={{
                            backgroundImage: `url("${item.image}")`,
                        }}
                        onClick={() => navigate(`/details/${item.id}`)}
                    >
                        <div className="ep">{item.currentNumberEpisode} / {item.totalEpisode}</div>
                        <div className="view">
                            <i className="fa fa-eye" /> {item.views}
                        </div>
                        <h5>
                            <a href="">{item.seriesName}</a>
                        </h5>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProductDetailSideBar
