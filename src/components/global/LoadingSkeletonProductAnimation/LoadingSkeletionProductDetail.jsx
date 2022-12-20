import React from 'react'
import { useTranslation } from 'react-i18next';

function LoadingSkeletionProductDetail() {
    const { t } = useTranslation();
    return (
        <div className="anime__details__content loading-skeleton">
            <div className="row">
                <div className="col-lg-3">
                    <div
                        className="anime__details__pic set-bg loading-skeleton-img"
                        style={{
                            backgroundImage: `url("/img/recent/recent-1.jpg")`,
                        }}
                    >
                        <div className="comment">
                            <i className="fa fa-comments" /> 999
                        </div>
                        <div className="view">
                            <i className="fa fa-eye" /> 999
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="anime__details__text">
                        <div className="anime__details__title">
                            <h3>series name placeholder</h3>
                            <span>movie title placeholder</span>
                        </div>
                        <p>
                            description placeholder
                            Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                            Corrupti fugiat sed reprehenderit
                            ex inventore sunt veniam commodi,
                            facilis deserunt alias laudantium
                            earum accusamus itaque soluta aspernatur
                            qui. Voluptate, vitae corporis.
                            earum accusamus itaque soluta aspernatur
                            qui. Voluptate, vitae corporis.
                        </p>
                        <div className="anime__details__widget">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <ul>
                                        <li>
                                            <span>{t("product_detail.studio")}</span> studio placeholder
                                        </li>
                                        <li>
                                            <span>{t("product_detail.date_aired")}</span> date air placeholder
                                        </li>
                                        <li>
                                            <span>{t("product_detail.episode")}</span> 999/999
                                        </li>
                                        <li>
                                            <span>{t("product_detail.genre")}</span>
                                            category item placeholder
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <ul>
                                        <li>
                                            <span>{t("product_detail.duration")}</span> 24 min/ep
                                        </li>
                                        <li>
                                            <span>{t("product_detail.quality")}</span> HD
                                        </li>
                                        <li>
                                            <span>{t("product_detail.views")}</span> 999
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="anime__details__btn text-white">
                            <a className="follow-btn">
                                <i className="fa fa-heart-o" /> {t("product_detail.btn_follow_text")}
                            </a>
                            <a className="follow-btn">
                                <i className="fa fa-heart-o" /> {t("product_detail.btn_follow_text")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingSkeletionProductDetail