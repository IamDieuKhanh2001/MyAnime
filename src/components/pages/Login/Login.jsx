import "./Login.scss";
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";
import SignUpThirdParty from "../SignUp/SignUpThirdParty/SignUpThirdParty";

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(50, "Up to 50 characters").required("Empty"),
      password: Yup.string().required("Empty"),
    }),
  });
  return (
    <div className="login">
      <Header />
      <div className="loginBody">
        <div className="container">
          <div className="wrapper">
            <form className="loginForm" onSubmit={formik.handleSubmit}>
              <p className="title">LOG IN</p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                <span className="error">
                  {formik.errors.username && formik.touched.username && (
                    <div>{formik.errors.username}</div>
                  )}
                </span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <span className="error">{formik.errors.password}</span>
              </div>
              <input type="submit" value="LOG IN" className="submit" />
              <div className="middle">
                <div className="cutSection" />
                <span className="or">Or</span>
                <div className="cutSection" />
              </div>
              <SignUpThirdParty />
              <div className="notAlreadyUser">
                Have not account yet?
                <span
                  className="anchorHandler"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
