import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APILogin, APIProfileUserLoging } from "../../../api/axios/customerAPI";
import { userActions } from "../../../api/redux/slices/userSlice";
import Footer from "../../global/Footer/Footer";
import Header from "../../global/Header/Header";
import NormalBreadcrumb from "../../global/NormalBreadcrumb/NormalBreadcrumb";
import "./Login.scss";
import MessageModal from "../../global/MessageModal/MessageModal";
import { useEffect } from "react";
import LoginThirdParty from "./LoginThirdParty/LoginThirdParty";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(50, t("login.yup.username_max_text"))
                .required(t("login.yup.username_empty")),
            password: Yup.string().required(t("login.yup.password_empty")),
        }),
        onSubmit: async ({ username, password }) => {
            setLoading(true);
            // alert(JSON.stringify(values, null, 2));
            //console.log(values);
            const resLogin = await APILogin(username, password);
            console.log(resLogin);
            if (resLogin.data) {
                window.sessionStorage.setItem("jwt", resLogin.data.jwt);
                window.sessionStorage.setItem("role", resLogin.data.authority);
                window.sessionStorage.setItem(
                    "username",
                    resLogin.data.username
                );
                const resUserInfo = await APIProfileUserLoging();
                console.log(resUserInfo);
                if (resUserInfo.data) {
                    window.sessionStorage.setItem(
                        "avatar",
                        resUserInfo.data.avatar ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    );
                    const updateUserInfo = userActions.updateUserInfo({
                        username: resUserInfo.data.username,
                        fullName: resUserInfo.data.fullName,
                        email: resUserInfo.data.email,
                        avatar: resUserInfo.data.avatar,
                        createAt: resUserInfo.data.createAt,
                    });
                    dispatch(updateUserInfo);
                    resLogin.data.authority === "ROLE_ADMIN" ? //Navigate user after login
                    (navigate("/admin")) 
                    : 
                    (navigate(-1))
                }
                setLoading(false);
                toast.success("Welcome back " + username)
            } else if (resLogin.response.status === 400) {
                setLoading(false);
                toast.error(resLogin.response.data)
            }
            //console.log(resLogin.response.status);
        },
    });

    useEffect(() => {
        document.title = t("login.title");
        window.scrollTo(0, 0);

        if (window.sessionStorage.getItem("jwt")) { //When user have logined, block user when return back to login page
            navigate("/");
        }
    }, []);

    return (
        <React.Fragment>
            <Header />
            <NormalBreadcrumb
                title={t("breadcrumb.login.title")}
                description={t("breadcrumb.login.description")}
            />
            {/* Login Section Begin */}
            <section className="login spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>{t("login.title")}</h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="input__item">
                                        <input
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                        />
                                        <span className="icon_profile" />
                                    </div>
                                    <span className="error">
                                        {formik.errors.username &&
                                            formik.touched.username && (
                                                <div>
                                                    {formik.errors.username}
                                                </div>
                                            )}
                                    </span>
                                    <div className="input__item">
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            id="password"
                                            value={formik.values.password}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                        <span className="icon_lock" />
                                    </div>
                                    <span className="error">
                                        {formik.errors.password}
                                    </span>

                                    <div className="d-flex flex-row">
                                        <button
                                            type="submit"
                                            className="site-btn mt-2"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <React.Fragment>
                                                    <BeatLoader
                                                        speedMultiplier={0.8}
                                                        margin={0}
                                                        size={11}
                                                        color="#fff"
                                                    />
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    {t(
                                                        "login.btn_login_now_text"
                                                    )}
                                                </React.Fragment>
                                            )}
                                        </button>
                                        <a href="/reset-password" className="forget_pass">
                                            {t("login.link_forgot_pw_text")}
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__register">
                                <h3>{t("login.login_register_title")}</h3>
                                <a href="/signup" className="primary-btn">
                                    {t("login.btn_register_now_text")}
                                </a>
                            </div>
                        </div>
                    </div>
                    <LoginThirdParty />
                </div>
            </section>
            <Footer />
        </React.Fragment>
    );
}

export default Login;
