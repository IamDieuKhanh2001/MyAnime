import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { APIRegister } from '../../../api/axios/customerAPI'
import * as Yup from "yup";
import Footer from '../../global/Footer/Footer'
import Header from '../../global/Header/Header'
import NormalBreadcrumb from '../../global/NormalBreadcrumb/NormalBreadcrumb'
import "./SignUp.scss"
import SignUpThirdParty from './SignUpThirdParty/SignUpThirdParty';
import { useDispatch } from 'react-redux';
import MessageModal from '../../global/MessageModal/MessageModal';
import { useState } from 'react';

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false); //Loading when on submit loading call API

    // const phoneRegExp =
    //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            retypepassword: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().max(50, "Up to 50 characters").required("Empty"),
            password: Yup.string()
                .required("Empty"),
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
                .required("Empty"),
        }),
        onSubmit: async values => {
            setLoading(true)
            const resRegister = await APIRegister(values.username, values.password)
            if (resRegister.data) {
                setLoading(false)
                navigate("/login");
            } else if (resRegister.response.status === 400) {
                setLoading(false)
                setModal(true);
            }
        }
    });

    return (
        <React.Fragment>
            <Header />
            <NormalBreadcrumb title={"Register"} description={"Welcome to our world named My Anime."} />
            <section className="signup spad">
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
                            message={"Username has been used"}
                            type={"error"}
                            setModal={setModal}
                        />
                    )}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>Sign Up</h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
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
                                            {formik.errors.username && formik.touched.username && (
                                                <div>{formik.errors.username}</div>
                                            )}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="input__item">
                                            <input
                                                type="password"
                                                id="password"
                                                placeholder="Password"
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
                                                placeholder="Enter Password Again"
                                                onBlur={formik.handleBlur}
                                                value={formik.values.retypepassword}
                                                onChange={formik.handleChange}
                                            />
                                            <span className="icon_lock" />
                                        </div>
                                        <span className="error">{formik.errors.retypepassword}</span>
                                    </div>
                                    <input type="submit" value="SIGN UP" className="site-btn" />
                                </form>
                                <h5>Already have an account? <a href="/login">Log In!</a></h5>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <SignUpThirdParty />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </React.Fragment>
    )
}

export default SignUp