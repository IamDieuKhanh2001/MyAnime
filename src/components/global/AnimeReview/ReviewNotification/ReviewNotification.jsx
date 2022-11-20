import { Alert, AlertTitle } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

function ReviewNotification() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Alert severity="warning">
        <AlertTitle>{t("anime_review.review_noti.title")}</AlertTitle>
        {t("anime_review.review_noti.content")} —
        <strong>
          <a href='/login'>
            {t("anime_review.review_noti.a_login_text")}
          </a></strong>
      </Alert>
    </React.Fragment>
  )
}

export default ReviewNotification
