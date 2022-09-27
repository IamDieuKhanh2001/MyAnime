import React from 'react'
import { useTranslation } from 'react-i18next';

function ReviewNotification() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="anime__review__item">
        <div className="anime__review__item__pic">
          <img src="/img/anime/adminstrator.jpg" alt />
        </div>
        <div className="anime__review__item__text">
          <h6>
            Administrator - <span>{t("anime_review.review_noti.title")} </span>
          </h6>
          <p>
            {t("anime_review.review_noti.content")}
            <br />
            <a href='/login'>
              {t("anime_review.review_noti.a_login_text")}
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ReviewNotification
