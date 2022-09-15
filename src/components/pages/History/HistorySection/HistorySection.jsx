import React from 'react'
import "./HistorySection.scss";
import { useNavigate } from 'react-router-dom';

function HistorySection({ data }) {
    const navigate = useNavigate();

    const totalSeconds = data.lastSecond;

    // 👇️ get number of full minutes
    const minutes = Math.floor(totalSeconds / 60);
    
    // 👇️ get remainder of seconds
    const seconds = totalSeconds % 60;
    
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    const handleNavigate = () => {        
        let params;
        params = `?episodeId=${data.episode_id}&second=${data.lastSecond}`
        navigate(`/watching/${data.series_id}${params}`)
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div onClick={() => handleNavigate()} className="product__item">
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
                        Last watched: Ep {data.episodeNumber} {padTo2Digits(minutes)}:{padTo2Digits(seconds)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HistorySection
