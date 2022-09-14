import React from 'react'

function ReviewNotification() {
  return (
    <React.Fragment>
            <div className="anime__review__item">
              <div className="anime__review__item__pic">
                <img src="/img/anime/adminstrator.jpg" alt />
              </div>
              <div className="anime__review__item__text">
                <h6>
                  Administrator - <span>Please login!!</span>
                </h6>
                <p>
                  Bạn cần phải đăng nhập để có thể xem được comment của series này!
                  <br />
                  <a href='/login'>Nhấn vào đây để đăng nhập</a>
                </p>
              </div>
            </div>
          </React.Fragment>
  )
}

export default ReviewNotification
