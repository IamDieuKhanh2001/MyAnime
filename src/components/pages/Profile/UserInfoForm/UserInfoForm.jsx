import React, { useEffect } from "react";
import { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import PuffLoader from "react-spinners/PuffLoader";
import { useSelector } from "react-redux";
import {
    APIChangeAvatar,
    APICheckIsPremiumMember,
    APIGetRemainTimePremiumMember,
    APIUpdateInfoUserLogging,
} from "../../../../api/axios/customerAPI";
import MessageModal from "../../../global/MessageModal/MessageModal";
import VerifyEmailModal from "../../../global/VerifyEmailModal/VerifyEmailModal";
import { useTranslation } from "react-i18next";
import "./UserInfoForm.scss"
import PremiumCard from "../PremiumCard/PremiumCard";

function UserInfoForm({ loadUserLogging }) {
    const { t } = useTranslation();
    const [previewImg, setPreviewImg] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    const data = useSelector((state) => state.users);
    const [modal, setModal] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");
    const [otpVerifyModal, setOtpVerifyModal] = useState(false);
    const [isPremiumMember, setIsPremiumMember] = useState(false)
    const [premiumHourRemain, setPremiumHourRemain] = useState(0);

    const checkIsPremiumMember = async () => {
        console.log("Calling api check premium member");
        const resCheckIsPremium = await APICheckIsPremiumMember();
        if (resCheckIsPremium?.status === 200) {
            if (resCheckIsPremium?.data) {
                setIsPremiumMember(true)
            }
        }
    };

    const getRemainTimePremiumMember = async () => {
        console.log("Calling api check premium member");
        const resRemainTimePremium = await APIGetRemainTimePremiumMember();
        if (resRemainTimePremium?.status === 200) {
            if (resRemainTimePremium?.data) {
                let date = new Date(resRemainTimePremium.data)

                console.log(resRemainTimePremium.data)
                setPremiumHourRemain(date.getTime())
            }
        }
    };


    useEffect(() => {
        checkIsPremiumMember()
        if (data.avatar) {
            setPreviewImg(data.avatar);
        }
        getRemainTimePremiumMember()
    }, [data]);

    const initialValues = {
        fullName: data.fullName !== undefined ? data.fullName : "",
        email: data?.email !== undefined ? data?.email : "",
    };

    const validationSchema = Yup.object().shape({
        //username: Yup.string().max(50, "Up to 50 characters").required("Empty"),
        fullName: Yup.string().max(50, "Up to 50 characters").required("Empty"),
        email: Yup.string().email("Invalid email").required("Empty"),
        avatar: Yup.mixed(),
    });
    const onSubmit = async (fields) => {
        console.log("call api update info");
        try {
            const resUpdateUserInfo = await APIUpdateInfoUserLogging(
                fields.fullName,
                fields.email
            );
            loadUserLogging();
            setUpdateMessage(resUpdateUserInfo.data);
            if (fields.email !== data.email) {
                //Changed email, get to OTP check
                setUpdateMessage(resUpdateUserInfo.data);
                setOtpVerifyModal(true);
            }
        } catch (responseException) {
            //400: user email has been used
            setUpdateMessage(responseException.response.data);
        }
        setModal(true);
    };
    const changeAvatar = (file) => {
        const reschangeAvatar = APIChangeAvatar(file);
    };
    const imageHandler = async (e) => {
        if (e.target.files[0]) {
            console.log("call api upload avatar");
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setPreviewImg(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
            changeAvatar(e.target.files[0]);
            loadUserLogging();
        }
    };

    return (
        <React.Fragment>
            {otpVerifyModal && (
                <VerifyEmailModal setOtpVerifyModal={setOtpVerifyModal} />
            )}
            {modal && (
                <MessageModal
                    message={updateMessage}
                    type={"success"}
                    setModal={setModal}
                />
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            // enableReinitialize
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="container-xl px-4 mt-4">
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="card mb-4 mb-xl-0">
                                        <div className="card-header">
                                            {t("profile.profile_picture_title")}
                                        </div>
                                        <div className="card-body text-center">
                                            <img
                                                className="img-account-profile rounded-circle mb-2"
                                                src={previewImg}
                                                alt="avatar"
                                                id="img"
                                            />
                                            <div className="small font-italic text-muted mb-4">
                                                {t(
                                                    "profile.profile_picture_require"
                                                )}
                                            </div>
                                            <label
                                                htmlFor="input"
                                                className="btn btn-danger custom-file-upload"
                                            >
                                                {t(
                                                    "profile.btn_change_image_text"
                                                )}
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="imageBtn"
                                                id="input"
                                                onChange={(e) =>
                                                    imageHandler(e)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            {t("profile.account_detail_title")}
                                        </div>
                                        <div className="card-body">
                                            <PremiumCard enable={isPremiumMember} remainTime={premiumHourRemain} />
                                            <div className="profileForm">
                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputUsername"
                                                    >
                                                        {t(
                                                            "profile.username_label"
                                                        )}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        id="inputUsername"
                                                        type="text"
                                                        name="username"
                                                        value={data.username}
                                                        readOnly={true}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputFullname"
                                                    >
                                                        {t(
                                                            "profile.fullname_label"
                                                        )}
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputFullname"
                                                        type="text"
                                                        name="fullName"
                                                        placeholder={t(
                                                            "profile.fullname_placeholder"
                                                        )}
                                                    />
                                                    <span className="error">
                                                        {errors.fullName &&
                                                            touched.fullName && (
                                                                <div>
                                                                    {
                                                                        errors.fullName
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputEmailAddress"
                                                    >
                                                        {t(
                                                            "profile.email_label"
                                                        )}
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputEmailAddress"
                                                        type="email"
                                                        name="email"
                                                        placeholder={t(
                                                            "profile.email_placeholder"
                                                        )}
                                                    />
                                                    <span className="error">
                                                        {errors.email &&
                                                            touched.email && (
                                                                <div>
                                                                    {
                                                                        errors.email
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>
                                                <button
                                                    className="btn btn-danger px-4"
                                                    type="submit"
                                                >
                                                    {isSubmitting ? (
                                                        <PuffLoader
                                                            color="#ffffff"
                                                            size={30}
                                                        />
                                                    ) : (
                                                        t(
                                                            "profile.btn_save_text"
                                                        )
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="notice-age">
                                        If you have not verified your age.
                                        Please verify{" "}
                                        <a href="/verify-age">here</a>!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}

export default UserInfoForm;
