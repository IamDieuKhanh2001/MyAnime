import React from "react";
import "./SignUp.scss";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SignUpThirdParty from "./SignUpThirdParty/SignUpThirdParty";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";

export default function SignUp() {
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
    onSubmit: values => {
      console.log(values)
    }
  });

  return (
    <div className="signUp">
      <Header />
      <div className="signUpBody">
        <div className="container">
          <div className="wrapper">
            <form className="signUpForm" onSubmit={formik.handleSubmit}>
              <p className="title">SIGN UP</p>
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="retypepassword"
                  placeholder="Enter Password Again"
                  onBlur={formik.handleBlur}
                  value={formik.values.retypepassword}
                  onChange={formik.handleChange}
                />
                <span className="error">{formik.errors.retypepassword}</span>
              </div>
              <input type="submit" value="SIGN UP" className="submit" />
              <div className="middle">
                <div className="cutSection" />
                <span className="or">Or</span>
                <div className="cutSection" />
              </div>
              <SignUpThirdParty />
              <div className="alreadyUser">
                Have an already account?
                <span
                  className="anchorHandler"
                  onClick={() => navigate("/login")}
                >
                  Log In
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
