import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../global/Layout/Layout'
import * as Yup from "yup";
import NormalBreadcrumb from '../../global/NormalBreadcrumb/NormalBreadcrumb'
import { useTranslation } from 'react-i18next';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import { APIGetMailVerification } from '../../../api/axios/customerAPI';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [sendingMail, setSendingMail] = useState(false); //Loading when on submit loading call API
    const [resetFormHidden, setResetFormHidden] = useState(true)

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t("forgot_password.yup.invalid_mail")).required(t("forgot_password.yup.mail_empty")),
        }),
        onSubmit: async values => {
            try {
                setSendingMail(true)
                const resSendVerifyMail = await APIGetMailVerification(values.email)
                console.log(resSendVerifyMail)
                setSendingMail(false)
                if (resSendVerifyMail?.response?.status === 400) {
                    toast.error(resSendVerifyMail.response.data)
                } else {
                    toast.success("Please check your mail box")
                    setResetFormHidden(false)
                }
            } catch (e) {
                toast.error("Send mail fail")
            }
        }
    });

    useEffect(() => {
        const username = window.sessionStorage.getItem("username");
        if(username) {
            navigate("/")
        }
    })

    return (
        <Layout>
            <NormalBreadcrumb title={t("forgot_password.title")} description={"Welcome to our world named My Anime."} />
            <section className="signup spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>
                                    {t("forgot_password.title")}
                                </h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <div className="input__item">
                                            <input
                                                disabled={!resetFormHidden}
                                                type="text"
                                                id="email"
                                                placeholder={t("forgot_password.email_placeholder")}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                            <span className="icon_profile" />
                                        </div>
                                        <span className="error">
                                            {formik.errors.email && formik.touched.email && (
                                                <div>{formik.errors.email}</div>
                                            )}
                                        </span>
                                    </div>
                                    {resetFormHidden && (
                                        <button
                                            type="submit"
                                            className="site-btn">
                                            {sendingMail ? (
                                                <React.Fragment>
                                                    <BeatLoader
                                                        speedMultiplier={0.8}
                                                        margin={0}
                                                        size={11}
                                                        color="#fff"
                                                    /> 
                                                    {t("forgot_password.btn_sending_text")}
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    <i className="fa fa-location-arrow" />
                                                    {t("forgot_password.btn_send_text")}
                                                </React.Fragment>
                                            )}
                                        </button>
                                    )}
                                </form>
                                {!resetFormHidden && <ResetPasswordForm email={formik.values.email} />}

                                <h5>{t("signup.login_register_title")}
                                    <a href="/login">{t("signup.login_text_a")}</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ForgotPassword