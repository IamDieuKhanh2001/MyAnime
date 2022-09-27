import React from "react";
import "./VerifyEmailModal.scss";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import { APIVerifyUserEmailOTP } from "../../../api/axios/customerAPI";
import { useState } from "react";
import MessageModal from "../MessageModal/MessageModal";

export default function VerifyEmailModal({ setOtpVerifyModal }) {

    const [modal, setModal] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("")

    const initialValues = {
        otp: "",
    };

    const validationSchema = Yup.object().shape({
        otp: Yup.number().typeError("OTP code could not have alphabet character"),
    });

    const onSubmit = async (values) => {
        const resVerifyOtpCode = await APIVerifyUserEmailOTP(values.otp)
        if (resVerifyOtpCode.status === 200) {
            setOtpVerifyModal(false)
            setUpdateMessage(resVerifyOtpCode.data)
        }
        else if(resVerifyOtpCode.response.status === 400) {
            setUpdateMessage(resVerifyOtpCode.response.data)
        }
        setModal(true)
    };

    return (
        <React.Fragment>
            {modal && (
                <MessageModal
                    message={updateMessage}
                    type={"error"}
                    setModal={setModal}
                />
            )}
            <div className="verifyEmailModal">
                <div className="modalOverlay"></div>
                <div className="modalBody">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="verigyEmailForm">
                                <div className="title">
                                    <i className="fa-solid fa-shield-halved"></i>
                                    <span>
                                        Look like you have changed your email,
                                        Have a look in your gmail inbox for getting <b>OTP</b> code
                                    </span>
                                </div>
                                <Field name="otp" placeholder="OTP 6 digit code ..." className="input" />
                                <ErrorMessage name="otp" component="div" className="error" />
                                <div className="buttons">
                                    <span
                                        className="cancel"
                                        onClick={() => setOtpVerifyModal(false)}
                                    >
                                        Cancel
                                    </span>
                                    <button type="submit" className="btn button">
                                        {isSubmitting ? (
                                            <React.Fragment>
                                                <PuffLoader color="#ffffff" size={30} />
                                                Verifying...
                                            </React.Fragment>
                                        ) : (
                                            "Verify"
                                        )}
                                    </button>
                                </div>
                            </Form>
                        )}

                    </Formik>
                </div>
            </div>
        </React.Fragment>
    );
}