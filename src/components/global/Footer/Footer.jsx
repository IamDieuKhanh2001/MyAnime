import React from "react";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <footer id="footer">
      <div className="page-up">
        <a href="#" id="scrollToTopButton"><span className="arrow_carrot-up"></span></a>
      </div>
      <div className="container">
        <div className="row top">
          <div className="col__left col-md-4 col-sm-12">
            <p className="title hideOnMobile">ANIME</p>
            <div className="row">
              <div className="col-lg-6 hideOnMobile">
                <span>{t("footer.faq")}</span>
                <span>{t("footer.brand_guidelines")}</span>
              </div>
              <div className="col-lg-6 col-sm-12 hideOnMobile">
                <span>{t("footer.terms_of_use")}</span>
                <span>{t("footer.privacy_policy")}</span>
              </div>
            </div>
          </div>
          <div className="col__center col-md-4 col-sm-12 hideOnMobile">
            <p className="title">{t("footer.sponsors")}</p>
            <div className="col-12">
              <a href="https://www.cgv.vn/" title="CGV">
                <img src="/img/cgv.png" alt="cgv" />
              </a>
              <a href="http://bhdstar.vn/" title="BHD">
                <img src="/img/bhd.png" alt="bhd" />
              </a>
              <a href="https://www.galaxycine.vn/" title="Galaxy">
                <img src="/img/galaxycine.png" alt="galaxycine" />
              </a>
              <a href="http://cinestar.com.vn/" title="Cinestar">
                <img src="/img/cinestar.png" alt="cinestar" />
              </a>
              <a
                href="http://lottecinemavn.com/LCHS/index.aspx"
                title="Lotte Cinema"
              >
                <img src="/img/lotte_cinema.png" alt="lotte_cinema" />
              </a>
            </div>
            <div className="col-12">
              <a href="https://www.megagscinemas.vn/" title="MegaGS">
                <img src="/img/megags.png" alt="megags" />
              </a>
              <a href="https://www.betacinemas.vn/home.htm" title="Beta">
                <img src="/img/bt.jpg" alt="bt" />
              </a>
              <a href="http://ddcinema.vn/" title="DDC">
                <img src="/img/dongdacinema.png" alt="dongdacinema" />
              </a>
              <a href="https://touchcinema.com/" title="Touch Cinema">
                <img src="/img/TOUCH.png" alt="TOUCH" />
              </a>
              <a href="https://cinemaxvn.com/" title="Cinemax">
                <img src="/img/cnx.jpg" alt="cnx" />
              </a>
            </div>
            <div className="col-12">
              <a href="http://starlight.vn/" title="Starlight">
                <img src="/img/STARLIGHT.png" alt="STARLIGHT" />
              </a>
              <a href="https://www.dcine.vn/" title="Dcine">
                <img src="/img/dcine.png" alt="dcine" />
              </a>
              <a href="https://zalopay.vn/" title="ZaloPay">
                <img src="/img/zalopay_icon.png" alt="zalopay_icon" />
              </a>
              <a href="https://www.payoo.vn/" title="Payoo">
                <img src="/img/payoo.jpg" alt="payoo" />
              </a>
              <a
                href="https://portal.vietcombank.com.vn/Pages/Home.aspx"
                title="Vietcombank"
              >
                <img src="/img/VCB.png" alt="VCB" />
              </a>
            </div>
            <div className="col-12">
              <a href="https://www.agribank.com.vn/" title="Agribank">
                <img src="/img/AGRIBANK.png" alt="AGRIBANK" />
              </a>
              <a href="https://www.vietinbank.vn/" title="Viettinbank">
                <img src="/img/VIETTINBANK.png" alt="VIETTINBANK" />
              </a>
              <a href="https://www.indovinabank.com.vn/" title="IVB">
                <img src="/img/IVB.png" alt="IVB" />
              </a>
              <a href="https://webv3.123go.vn/" title="123Go">
                <img src="/img/123go.png" alt="123go" />
              </a>
              <a href="https://laban.vn/" title="La Bàn">
                <img src="/img/laban.png" alt="laban" />
              </a>
            </div>
          </div>
          <div className="col__right col-md-4 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-sm-12 hideOnMobile">
                <p className="title">
                  {t("footer.mobile_app")}
                </p>
                <a
                  href="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197"
                  title="Apple App"
                >
                  <img
                    className="iconApp"
                    src="/img/apple-logo.png"
                    alt="app"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                  title="Android App"
                >
                  <img
                    className="iconApp"
                    src="/img/android-logo.png"
                    alt="app"
                  />
                </a>
              </div>
              <div className="col-md-6 col-sm-12 textCenter hideOnMobile">
                <p className="title">
                  {t("footer.social_media")}
                </p>
                <a
                  href="https://www.facebook.com/tix.vn/"
                  title="Facebook social"
                >
                  <img
                    className="iconApp"
                    src="/img/facebook-logo.png"
                    alt="app"
                  />
                </a>
                <a href="https://zalo.me/tixdatve" title="Zalo social">
                  <img className="iconApp" src="/img/zalo-logo.png" alt="app" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 hideOnMobile" />
        <div className="row bottom">
          <div className="col-12 col-md-1 imgFooter">
            <img
              onClick={() => navigate("/")}
              className="zionIcon"
              src="/img/logo.png"
              alt="zion"
            />
          </div>
          <div className="col-12 col-md-9 info">
            <p>{t("footer.info_title")}</p>
            <ul>
              <li>
                {t("footer.info_address")}
              </li>
              <li>
                {t("footer.info_business_registration_certificate_no")} 0123456789
                <br />
                {t("footer.info_change_at")}
              </li>
              <li>{t("footer.info_phone")} 1900 000 000</li>
              <li>
                {t("footer.info_email")} <span>support@myanime.vn</span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-2 imgFooter d-flex justify-content-end">
            <a href="http://online.gov.vn/Home/WebDetails/62782?AspxAutoDetectCookieSupport=1">
              <img
                className="boCongThuongIcon"
                src="/img/d1e6bd560daa9e20131ea8a0f62e87f8.png"
                alt="boCongThuong"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
