import React from 'react'
import ReactTimeAgo from 'react-time-ago'

function ReviewItem({ data, lastItemRef = null }) {
    return (
        <div className="anime__review__item" ref={lastItemRef}>
            {data.avatar !== null ? (
                <div className="anime__review__item__pic">
                    <img src={`${data.avatar}`} alt={data.username} />
                </div>
            ) : (
                // default avatar if avatar user is not set
                <div className="anime__review__item__pic"> 
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' 
                    alt={data.username} />
                </div>
            )}
            <div className="anime__review__item__text">
                <h6>
                    {data.username} - <span><ReactTimeAgo date={Date.parse(data.createAt)} locale="en-US" /></span>
                </h6>
                <p>
                    {data.content}
                </p>
            </div>
        </div>
    )
}

export default ReviewItem
