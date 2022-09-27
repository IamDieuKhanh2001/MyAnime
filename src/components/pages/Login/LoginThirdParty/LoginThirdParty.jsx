import React from 'react'
import { useTranslation } from 'react-i18next';

function LoginThirdParty() {
    const { t } = useTranslation();

    return (
        <div className="login__social">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-6">
                    <div className="login__social__links">
                        <span>{t("login.third_party.or")}</span>
                        <ul>
                            <li><a href="#" className="facebook"><i className="fa fa-facebook" />
                            {t("login.third_party.with_facebook_li")}
                                </a>
                                </li>
                            <li><a href="#" className="google"><i className="fa fa-google" />
                            {t("login.third_party.with_google_li")}
                                </a></li>
                            <li><a href="#" className="twitter"><i className="fa fa-twitter" />
                                {t("login.third_party.with_twitter_li")}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginThirdParty
