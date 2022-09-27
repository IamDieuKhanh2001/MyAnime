import React from 'react'
import { useTranslation } from 'react-i18next';

function SignUpThirdParty() {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div className="login__social__links">
                <h3>{t("signup.third_party.login_social_title")}</h3>
                <ul>
                    <li><a href="#" className="facebook"><i className="fa fa-facebook" />
                    {t("signup.third_party.with_facebook_li")}</a>
                    </li>
                    <li><a href="#" className="google"><i className="fa fa-google" />
                    {t("signup.third_party.with_google_li")}</a></li>
                    <li><a href="#" className="twitter"><i className="fa fa-twitter" />
                    {t("signup.third_party.with_twitter_li")}</a></li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default SignUpThirdParty
