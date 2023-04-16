import React, { useEffect } from "react";
import "./Profile.scss";
import Header from "./../../global/Header/Header";
import Footer from "./../../global/Footer/Footer";
import { useDispatch } from "react-redux";
import { APIProfileUserLoging } from "../../../api/axios/customerAPI";
import UserInfoForm from "./UserInfoForm/UserInfoForm";
import FavoriteSeries from "../FavoriteSeries/FavoriteSeries";
import NormalBreadcrumb from "../../global/NormalBreadcrumb/NormalBreadcrumb";
import { useState } from "react";
import LoadingAnimation from "../../global/LoadingAnimation/LoadingAnimation";

export default function Profile() {
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    loadUserLogging()
  }, []);

  const loadUserLogging = async () => {
    console.log("calling api my profile");
    setLoading(true)
    const resUserInfo = await APIProfileUserLoging();
    console.log(resUserInfo)
    if (resUserInfo?.status === 200) {
      setDataUser(resUserInfo.data)
      sessionStorage.setItem('avatar', resUserInfo.data.avatar); //Change ava in header
      setLoading(false)
    }
  }

  return (
    <div className="profile">
      <Header />
      <NormalBreadcrumb title={dataUser.username ? dataUser.username : "Anonymous user"} description={"Let us know your mail to help you secure your account."} />
      {loading ?
        <LoadingAnimation />
        :
        <UserInfoForm
          data={dataUser}
          setData={setDataUser}
        />}
      <NormalBreadcrumb title={"Your favorite series"} description={"Series saved."} />
      <FavoriteSeries />
      <Footer />
    </div>
  );
}
