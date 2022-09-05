import "./Login.scss";
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";
import SignUpThirdParty from "../SignUp/SignUpThirdParty/SignUpThirdParty";
import { APILogin, APIProfileUserLoging } from "../../../api/axios/customerAPI";
import { userActions } from "../../../api/redux/slices/userSlice";
import { useEffect } from "react";
import MessageModal from "../../global/MessageModal/MessageModal";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(50, "Up to 50 characters").required("Empty"),
      password: Yup.string().required("Empty"),
    }),
    onSubmit: async values => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values)
      const resLogin = await APILogin(values.username, values.password)
      console.log(resLogin)
      if (resLogin.data) {
        window.sessionStorage.setItem("jwt", resLogin.data.jwt);
        window.sessionStorage.setItem("role", resLogin.data.authority);
        window.sessionStorage.setItem("username", resLogin.data.username);
        const resUserInfo = await APIProfileUserLoging();
        console.log(resUserInfo)
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
            createAt: resUserInfo.data.createAt
          });
          dispatch(updateUserInfo);
          navigate("/");
        }
      }
      // if(resLogin.response.status === 400) {
      //   setModal(true)
      // }
      // console.log(resLogin.response.status)
    },
  });

  // const initialValues = {
  //   username: "",
  //   password: "",
  // };

  // const validate = Yup.object().shape({
  //   username: Yup.string().required("Vui lòng điền vào mục này"),
  //   password: Yup.string().required("Vui lòng điền vào mục này"),
  // });

  // useEffect(() => {
  //   document.title = "Đăng nhập";
  //   window.scrollTo(0, 0);

  //   if(window.sessionStorage.getItem("jwt")){
  //     navigate("/")
  //   }
  // }, []);

  return (
    <div className="login">
      <Header />
      {/* {modal && ()} */}
      {/* <MessageModal message={"Username or Password invalid"}
        type={"error"}
        setModal={modal} /> */}

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
