import React, { useState } from 'react'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { APIGetAllSeriesProductById } from '../../../../api/axios/productAPI';
import LoadingAnimation from '../../LoadingAnimation/LoadingAnimation';

function ProductDetailSideBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { seriesId } = useParams();
    const [relatedSeries, setRelatedSeries] = useState([])
    const [loadingRelatedSeries, setLoadingRelatedSeries] = useState(false)

    const loadAllSeriesProductBySeriesId = async () => {
        console.log("Calling api get product series");
        setLoadingRelatedSeries(true)
        const resGetRelateSeries = await APIGetAllSeriesProductById(seriesId);
        if (resGetRelateSeries?.status === 200) {
            setRelatedSeries(resGetRelateSeries.data)
            setLoadingRelatedSeries(false)
        }
    };

    useEffect(() => {
        loadAllSeriesProductBySeriesId()
    }, [])

    return (
        <div className="anime__details__sidebar">
            <div className="section-title">
                <h5>
                    {t("product_detail.side_bar.section_title")}
                </h5>
            </div>
            {loadingRelatedSeries && <LoadingAnimation />}
            {relatedSeries?.map((item, index) => (
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
