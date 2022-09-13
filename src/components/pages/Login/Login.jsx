import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { APILogin, APIProfileUserLoging } from '../../../api/axios/customerAPI'
import { userActions } from '../../../api/redux/slices/userSlice'
import Footer from '../../global/Footer/Footer'
import Header from '../../global/Header/Header'
import NormalBreadcrumb from '../../global/NormalBreadcrumb/NormalBreadcrumb'
import "./Login.scss"
import MessageModal from '../../global/MessageModal/MessageModal';
import { useEffect } from 'react';
import LoginThirdParty from './LoginThirdParty/LoginThirdParty';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false); //Loading when on submit loading call API
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().max(50, "Up to 50 characters").required("Empty Username!!"),
            password: Yup.string().required("Empty password!!"),
        }),
        onSubmit: async ({ username, password }) => {
            setLoading(true)
            // alert(JSON.stringify(values, null, 2));
            //console.log(values);
            const resLogin = await APILogin(username, password);
            console.log(resLogin);
            if (resLogin.data) {
                window.sessionStorage.setItem("jwt", resLogin.data.jwt);
                window.sessionStorage.setItem("role", resLogin.data.authority);
                window.sessionStorage.setItem("username", resLogin.data.username);
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
                    navigate("/");
                }
                setLoading(false)
            } else if (resLogin.response.status === 400) {
                setLoading(false)
                setModal(true);
            }
            //console.log(resLogin.response.status);
        },
    });

    useEffect(() => {
        document.title = "Đăng nhập";
        window.scrollTo(0, 0);

        if (window.sessionStorage.getItem("jwt")) {
            navigate("/")
        }
    }, []);

    return (
        <React.Fragment>
            <Header />
            <NormalBreadcrumb title={"Login"} description={"Please login for getting better experience."} />
            {/* Login Section Begin */}
            <section className="login spad">
                <div className="container">
                    {loading && (
                        <MessageModal
                            message={"Logging in, please wait!!"}
                            type={"loading"}
                            setModal={loading}
                        />
                    )}
                    {modal && (
                        <MessageModal
                            message={"Username or Password Invalid"}
                            type={"error"}
                            setModal={setModal}
                        />
                    )}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>Login</h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="input__item">
                                        <input
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            value={formik.values.username}
                                            onChange={formik.handleChange} />
                                        <span className="icon_profile" />
                                    </div>
                                    <span className="error">
                                        {formik.errors.username && formik.touched.username && (
                                            <div>{formik.errors.username}</div>
                                        )}
                                    </span>
                                    <div className="input__item">
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            id="password"
                                            value={formik.values.password}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange} />
                                        <span className="icon_lock" />
                                    </div>
                                    <span className="error">{formik.errors.password}</span>

                                    <div className='d-flex flex-row'>
                                        <input type="submit" value="Login Now" className="site-btn mt-2" />
                                        {/* <button type="submit" className="site-btn">Login Now</button> */}
                                        <a href="#" className="forget_pass">Forgot Your Password?</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__register">
                                <h3>Dont’t Have An Account?</h3>
                                <a href="/signup" className="primary-btn">Register Now</a>
                            </div>
                        </div>
                    </div>
                    <LoginThirdParty />
                </div>
            </section>
            <Footer />
        </React.Fragment>
    )
}

export default Login