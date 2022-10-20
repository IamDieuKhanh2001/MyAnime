import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { APISaveOrDeleteUserFavoriteSeries } from '../../../../api/axios/productAPI';

function ProductDetail({ data }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const historyList = useSelector((state) => state.histories.list);

    const handleNavigate = () => {
        let historySeriesLastExit = historyList.find(history => history.series_id === data.id)
        let params;
        if (historySeriesLastExit) {
            params = `?episodeId=${historySeriesLastExit.episode_id}&second=${historySeriesLastExit.lastSecond}`
        } else {
            params = `?episodeId=-1&second=0`
        }
        navigate(`/watching/${data.id}${params}`, {
            state: {
                product: data,
            },
        })
    }

    const handlesaveOrUnsaveFavorite = () => {
        saveOrUnsaveFavorite()
    }

    const saveOrUnsaveFavorite = async () => {
        console.log("Calling api save favorite");
        const resSaveFavorite = await APISaveOrDeleteUserFavoriteSeries(data.id);
        console.log(resSaveFavorite)
        if (resSaveFavorite?.status === 200) {
            toast.success(`Saved movie ${data.seriesName} to favorite`);
        } else if(resSaveFavorite?.status === 204) {
            toast.success(`Remove movie ${data.seriesName} from favorite`)
        } else {
            toast.error(`You need to logging to use this feature!!`)
        }
    };

    return (
        <div className="anime__details__content">
            <div className="row">
                <div className="col-lg-3">
                    <div
                        className="anime__details__pic set-bg"
                        style={{
                            backgroundImage: `url("${data.image}")`,
                        }}
                    >
                        <div className="comment">
                            <i className="fa fa-comments" /> {data.commentTotal}
                        </div>
                        <div className="view">
                            <i className="fa fa-eye" /> {data.views}
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="anime__details__text">
                        <div className="anime__details__title">
                            <h3>{data.seriesName}</h3>
                            <span>{data.movieTitle}</span>
                        </div>
                        <div className="anime__details__rating">
                            <div className="rating">
                                <a href="#">
                                    <i className="fa fa-star" />
                                </a>
                                <a href="#">
                                    <i className="fa fa-star" />
                                </a>
                                <a href="#">
                                    <i className="fa fa-star" />
                                </a>
                                <a href="#">
                                    <i className="fa fa-star" />
                                </a>
                                <a href="#">
                                    <i className="fa fa-star-half-o" />
                                </a>
                            </div>
                            <span>1.029 Votes</span>
                        </div>
                        <p>
                            {data.description}
                        </p>
                        <div className="anime__details__widget">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <ul>
                                        <li>
                                            <span>{t("product_detail.studio")}</span> {data.studioName}
                                        </li>
                                        <li>
                                            <span>{t("product_detail.date_aired")}</span> {data.dateAired}
                                        </li>
                                        <li>
                                            <span>{t("product_detail.episode")}</span> {data.currentNumberEpisode}/{data.totalEpisode}
                                        </li>
                                        <li>
                                            <span>{t("product_detail.genre")}</span>
                                            {/* Live Action */}
                                            {data?.categoryList?.length !== 0 && (data?.categoryList?.map((category, index) => (
                                                <React.Fragment key={index}>
                                                    {category?.name}&ensp;
                                                </React.Fragment>
                                            )))}
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <ul>
                                        <li>
                                            <span>{t("product_detail.duration")}</span> 24 min/ep
                                        </li>
                                        <li>
                                            <span>{t("product_detail.quality")}</span> HD
                                        </li>
                                        <li>
                                            <span>{t("product_detail.views")}</span> {data.views}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="anime__details__btn">
                            <a onClick={() => handlesaveOrUnsaveFavorite()} className="follow-btn">
                                <i className="fa fa-heart-o" /> {t("product_detail.btn_follow_text")}
                            </a>
                            {data.currentNumberEpisode !== 0 ? (
                                <a
                                    onClick={() => handleNavigate()}
                                    className="watch-btn"
                                >
                                    <span>{t("product_detail.btn_watch_now_text")}</span> <i className="fa fa-angle-right" />
                                </a>
                            ) : (
                                <a
                                    className="watch-btn disabled"
                                >
                                    <span>{t("product_detail.btn_comming_soon_text")}</span> <i className="fa fa-angle-right" />
                                </a>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
