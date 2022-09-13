import React from 'react'

function ReviewItem({ data }) {
    return (
        <div className="anime__review__item">
            {data.avatar !== null ? (
                <div className="anime__review__item__pic">
                    <img src={`${data.avatar}`} alt={data.username} />
                </div>
            ) : (
                // default username if avatar user is not set
                <div className="anime__review__item__pic"> 
                    <img src='	https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt={data.username} />
                </div>
            )}
            <div className="anime__review__item__text">
                <h6>
                    {data.username} - <span>{data.createAt}</span>
                </h6>
                <p>
                    {data.content}
                </p>
            </div>
        </div>
    )
}

export default ReviewItem
