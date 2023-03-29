import React, { useEffect } from "react";
import "./Profile.scss";
import Header from "./../../global/Header/Header";
import Footer from "./../../global/Footer/Footer";
import { useDispatch } from "react-redux";
import { APIProfileUserLoging } from "../../../api/axios/customerAPI";
import { userActions } from "../../../api/redux/slices/userSlice";
import UserInfoForm from "./UserInfoForm/UserInfoForm";
import FavoriteSeries from "../FavoriteSeries/FavoriteSeries";
import NormalBreadcrumb from "../../global/NormalBreadcrumb/NormalBreadcrumb";

export default function Profile() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    loadUserLogging()
    // if (data.avatar) {
    //   setPreviewImg(data.avatar);
    // }

  }, []);

  const loadUserLogging = async () => {
    console.log("calling api my profile");
    const resUserInfo = await APIProfileUserLoging();
    if (resUserInfo.data) {
      const updateUserInfo = userActions.updateUserInfo({
        username: resUserInfo.data.username,
        fullName: resUserInfo.data.fullName,
        email: resUserInfo.data.email,
        avatar: resUserInfo.data.avatar,
        createAt: resUserInfo.data.createAt,
      });
      dispatch(updateUserInfo);
      sessionStorage.setItem('avatar', resUserInfo.data.avatar); //Change ava in header
    }

  }

  return (
    <div className="profile">
      <Header />
      <NormalBreadcrumb title={"Personal Infomation"} description={"Let us know your mail to help you secure your account."} />
      <UserInfoForm loadUserLogging={loadUserLogging} />
      <NormalBreadcrumb title={"Your favorite series"} description={"Series saved."} />
      <FavoriteSeries />
      <Footer />
    </div>
  );
}
