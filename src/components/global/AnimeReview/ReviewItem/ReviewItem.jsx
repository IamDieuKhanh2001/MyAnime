import React from 'react'

function ReviewItem() {
    return (
        <div className="anime__review__item">
            <div className="anime__review__item__pic">
                <img src="/img/anime/review-1.jpg" alt />
            </div>
            <div className="anime__review__item__text">
                <h6>
                    Chris Curry - <span>1 Hour ago</span>
                </h6>
                <p>
                    whachikan Just noticed that someone categorized this as
                    belonging to the genre "demons" LOL
                </p>
            </div>
        </div>
    )
}

export default ReviewItem
