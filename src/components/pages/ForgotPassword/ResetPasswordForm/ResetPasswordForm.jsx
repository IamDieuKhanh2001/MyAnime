import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { APIResetUserPassword } from '../../../../api/axios/customerAPI';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function ResetPasswordForm({ email }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [loadingResetPassword, setLoadingResetPassword] = useState(false); //Loading when on submit loading call API

    const formik = useFormik({
        initialValues: {
            email: email,
            codeConfirmation: "",
            password: "",
            retypepassword: "",
        },
        validationSchema: Yup.object({
            codeConfirmation: Yup.number().min(6, "Up to 6 number").required("Empty"),
            password: Yup.string()
                .required(t("signup.yup.password_empty")),
            // .matches(
            //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            //   "Password must contain at least 8 characters, including 1 uppercase letter, 1 number and 1 special character"
            // )
            retypepassword: Yup.string()
                .when("password", {
                    is: (val) => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Password does not match"
                    ),
                })
                .required(t("signup.yup.password_empty")),
        }),
        onSubmit: async values => {
            setLoadingResetPassword(true)
            const resResetPassword = await APIResetUserPassword(
                values.email,
                values.codeConfirmation,
                values.password)
            console.log(resResetPassword)
            if (resResetPassword?.response?.status === 400) {
                toast.error(resResetPassword?.response.data)
            } else {
                toast.success("Reset password success")
                navigate("/login");
            }
            setLoadingResetPassword(false)
        }
    });

    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className="input__item">
                        <input
                            type="text"
                            id="codeConfirmation"
                            placeholder={t("forgot_password.code_placeholder")}
                            value={formik.values.codeConfirmation}
                            onChange={formik.handleChange}
                        />
                        <span className="icon_profile" />
                    </div>
                    <span className="error">
                        {formik.errors.codeConfirmation && formik.touched.codeConfirmation && (
                            <div>{formik.errors.codeConfirmation}</div>
                        )}
                    </span>
                </div>
                <div>
                    <div className="input__item">
                        <input
                            type="password"
                            id="password"
                            placeholder={t("forgot_password.password_placeholder")}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <span className="icon_lock" />
                    </div>
                    <span className="error">{formik.errors.password}</span>
                </div>
                <div>
                    <div className="input__item">
                        <input
                            type="password"
                            id="retypepassword"
                            placeholder={t("forgot_password.password_retype_placeholder")}
                            onBlur={formik.handleBlur}
                            value={formik.values.retypepassword}
                            onChange={formik.handleChange}
                        />
                        <span className="icon_lock" />
                    </div>
                    <span className="error">{formik.errors.retypepassword}</span>
                </div>
                <button type="submit" className="site-btn">
                    {loadingResetPassword ? (
                        <React.Fragment>
                            <BeatLoader
                                speedMultiplier={0.8}
                                margin={0}
                                size={11}
                                color="#fff"
                            />
                            {t("forgot_password.btn_reseting_text")}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <i className="fa fa-location-arrow" />
                            {t("forgot_password.btn_reset_text")}
                        </React.Fragment>
                    )}
                </button>
            </form>
        </React.Fragment>
    )
}

export default ResetPasswordForm