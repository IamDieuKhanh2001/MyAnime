import React, { useEffect } from "react";
import { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import PuffLoader from "react-spinners/PuffLoader";
import { useDispatch, useSelector } from "react-redux";
import {
    APIChangeAvatar,
    APICheckIsPremiumMember,
    APIGetRemainTimePremiumMember,
    APIProfileUserLoging,
    APIUpdateInfoUserLogging,
} from "../../../../api/axios/customerAPI";
import VerifyEmailModal from "../../../global/VerifyEmailModal/VerifyEmailModal";
import { useTranslation } from "react-i18next";
import "./UserInfoForm.scss"
import PremiumCard from "../PremiumCard/PremiumCard";
import { toast } from "react-toastify";
import { Dialog } from "@mui/material";

function UserInfoForm({ data, setData }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [previewImg, setPreviewImg] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    const [otpVerifyModal, setOtpVerifyModal] = useState(false);
    const [isPremiumMember, setIsPremiumMember] = useState(false)
    const [premiumDayRemain, setPremiumDayRemain] = useState(0);

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
                setPremiumDayRemain(date.getTime())
            }
        }
    };


    useEffect(() => {
        console.log(data)
        checkIsPremiumMember()
        if (data.avatar) {
            setPreviewImg(data.avatar);
        }
        getRemainTimePremiumMember()
    }, []);

    const initialValues = {
        fullName: data?.fullName,
        email: data?.email,
    };

    const validationSchema = Yup.object().shape({
        //username: Yup.string().max(50, "Up to 50 characters").required("Empty"),
        fullName: Yup.string().trim().max(50, "Up to 50 characters").nullable().required("Empty"),
        email: Yup.string().email("Invalid email").required("Empty"),
        avatar: Yup.mixed(),
    });
    const onSubmit = async (fields) => {
        console.log("call api update info");
        console.log(fields.fullName)
        try {
            const resUpdateUserInfo = await APIUpdateInfoUserLogging(
                fields.fullName,
                fields.email
            );
            toast.success(resUpdateUserInfo.data)
            if (fields.email !== data.email) {
                //Changed email, get to OTP check
                toast.success("We need verify your mail, check inbox gmail!")
                setOtpVerifyModal(true);
            }
            loadUserLogging();
        } catch (responseException) {
            //400: user email has been used
            toast.error(responseException.response.data)
        }
    };
    // const changeAvatar = (file) => {
    //     const reschangeAvatar =;
    // };
    const imageHandler = async (e) => {
        if (e.target.files[0]) {
            console.log("call api upload avatar");
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setPreviewImg(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
            APIChangeAvatar(e.target.files[0])
            .then((res) => {
                toast.success("Change image success")
                loadUserLogging();
            })
            .catch((err) => {
                console.log(err)
                toast.error("Change image fail")
            })
        }
    };

    const loadUserLogging = async () => {
        console.log("calling api my profile");
        const resUserInfo = await APIProfileUserLoging();
        console.log(resUserInfo)
        if (resUserInfo?.status === 200) {
            setData(resUserInfo.data)
            sessionStorage.setItem('avatar', resUserInfo.data.avatar); //Change ava in header
        }
    }
    
    return (
        <React.Fragment>
            <Dialog maxWidth="sm" fullWidth={false} open={otpVerifyModal} onClose={() => { setOtpVerifyModal(false) }}>
                <VerifyEmailModal setOtpVerifyModal={setOtpVerifyModal} />
            </Dialog>

            {/* {otpVerifyModal && (
                <VerifyEmailModal setOtpVerifyModal={setOtpVerifyModal} />
            )}
            <VerifyEmailModal setOtpVerifyModal={setOtpVerifyModal} /> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            // enableReinitialize
            >
                {({ errors, touched, isSubmitting, formik }) => (
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
                                            <PremiumCard enable={isPremiumMember} remainTime={premiumDayRemain} />
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
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <React.Fragment>
                                                            <PuffLoader
                                                                color="#ffffff"
                                                                size={30}
                                                            />
                                                            Saving your profile, please wait!
                                                        </React.Fragment>
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
