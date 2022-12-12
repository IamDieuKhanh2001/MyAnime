import React from 'react'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function ProductDetailSideBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const relateSeries = useSelector((state) => state.products.relateSeries);

    useEffect(() => {

    }, [])

    return (
        <div className="anime__details__sidebar">
            <div className="section-title">
                <h5>
                    {t("product_detail.side_bar.section_title")}
                </h5>
            </div>
            {relateSeries?.map((item, index) => (
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
