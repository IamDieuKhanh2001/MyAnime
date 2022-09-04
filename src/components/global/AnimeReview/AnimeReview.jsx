import React from 'react'
import ReviewItem from './ReviewItem/ReviewItem'

function AnimeReview() {
  return (
    <React.Fragment>
      <div className="anime__details__review">
                <div className="section-title">
                  <h5>Reviews</h5>
                </div>
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
              </div>
              <div className="anime__details__form">
                <div className="section-title">
                  <h5>Your Comment</h5>
                </div>
                <form action="#">
                  <textarea placeholder="Your Comment" defaultValue={""} />
                  <button type="submit">
                    <i className="fa fa-location-arrow" /> Review
                  </button>
                </form>
              </div>
    </React.Fragment>
  )
}

export default AnimeReview
