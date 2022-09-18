import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function ProductDetail({ data }) {
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
        navigate(`/watching/${data.id}${params}`)
    }
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
                                            <span>Studios:</span> {data.studioName}
                                        </li>
                                        <li>
                                            <span>Date aired:</span> {data.dateAired}
                                        </li>
                                        <li>
                                            <span>Episodes:</span> {data.currentNumberEpisode}/{data.totalEpisode}
                                        </li>
                                        <li>
                                            <span>Genre:</span> cate
                                            {/* {data.categoryList.length !== 0 && (data.categoryList.map((category, index) => (
                                                <React.Fragment key={index}>
                                                    {category.name},
                                                </React.Fragment>
                                            )))} */}
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <ul>
                                        <li>
                                            <span>Scores:</span> 7.31 / 1,515
                                        </li>
                                        <li>
                                            <span>Rating:</span> 8.5 / 161 times
                                        </li>
                                        <li>
                                            <span>Duration:</span> 24 min/ep
                                        </li>
                                        <li>
                                            <span>Quality:</span> HD
                                        </li>
                                        <li>
                                            <span>Views:</span> {data.views}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="anime__details__btn">
                            <a href="#" className="follow-btn">
                                <i className="fa fa-heart-o" /> Follow
                            </a>
                            {data.currentNumberEpisode !== 0 ? (
                                <a
                                    onClick={() => handleNavigate()}
                                    className="watch-btn"
                                >
                                    <span>Watch Now</span> <i className="fa fa-angle-right" />
                                </a>
                            ) : (
                                <a
                                    className="watch-btn disabled"
                                >
                                    <span>Comming soon ...</span> <i className="fa fa-angle-right" />
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
