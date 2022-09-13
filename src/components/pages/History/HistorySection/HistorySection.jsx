import React from 'react'
import "./HistorySection.scss";
import { useNavigate } from 'react-router-dom';

function HistorySection({ data }) {
    const navigate = useNavigate();
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div onClick={() => navigate(`/`)} className="product__item">
                <div
                    className="product__item__pic set-bg"
                    style={{
                        backgroundImage: `url("${data.image}")`,
                    }}
                >
                </div>
                <div className="product__item__text">
                    <h5>
                        <a href="#">{data.seriesName}</a>
                    </h5>
                    <p className='text-white font-italic'>
                        Last watched: Ep {data.episodeNumber} {data.lastSecond}s
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HistorySection
