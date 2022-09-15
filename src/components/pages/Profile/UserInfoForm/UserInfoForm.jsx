import React from 'react'
import { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import PuffLoader from "react-spinners/PuffLoader";
import { useDispatch, useSelector } from "react-redux";

function UserInfoForm() {
    const data = useSelector((state) => state.users);

    const [previewImg, setPreviewImg] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );

    const initialValues = {
        //username: "",
        // fullName: data.fullName !== undefined ? data.fullName : "",
        // email: data.email ? data.email : "",
        // avatar: data.avatar,
        fullName: "",
        email: "",
        avatar: "",
    };

    const validationSchema = Yup.object().shape({
        //username: Yup.string().max(50, "Up to 50 characters").required("Empty"),
        fullName: Yup.string().max(50, "Up to 50 characters").required("Empty"),
        email: Yup.string().email("Invalid email").required("Empty"),
        avatar: Yup.mixed(),
    });
    const onSubmit = async (fields) => {
        console.log(fields);
    };
    const imageHandler = (e, setFieldValue) => {
        if (e.target.files[0]) {
            setFieldValue("avatar", e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setPreviewImg(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    return (
        <React.Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ setFieldValue, errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="container-xl px-4 mt-4">
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="card mb-4 mb-xl-0">
                                        <div className="card-header">Profile Picture</div>
                                        <div className="card-body text-center">
                                            <img
                                                className="img-account-profile rounded-circle mb-2"
                                                src={previewImg}
                                                alt="avatar"
                                                id="img"
                                            />
                                            <div className="small font-italic text-muted mb-4">
                                                JPG or PNG no larger than 5 MB
                                            </div>
                                            <label
                                                htmlFor="input"
                                                className="btn btn-danger custom-file-upload"
                                            >
                                                Upload Image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="imageBtn"
                                                id="input"
                                                onChange={(e) => imageHandler(e, setFieldValue)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="card mb-4">
                                        <div className="card-header">Account Details</div>
                                        <div className="card-body">
                                            <div className="profileForm">
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputUsername">
                                                        Username
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputUsername"
                                                        type="text"
                                                        name="username"
                                                        // value={data.username}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputFullname">
                                                        Fullname
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputFullname"
                                                        type="text"
                                                        name="fullName"
                                                        placeholder="Enter your full name"
                                                    />
                                                    <span className="error">
                                                        {errors.fullName && touched.fullName && (
                                                            <div>{errors.fullName}</div>
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputEmailAddress"
                                                    >
                                                        Email address
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputEmailAddress"
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter your email address"
                                                    />
                                                    <span className="error">
                                                        {errors.email && touched.email && (
                                                            <div>{errors.email}</div>
                                                        )}
                                                    </span>
                                                </div>

                                                <button className="btn btn-danger px-4" type="submit">
                                                    {isSubmitting ? (
                                                        <PuffLoader color="#ffffff" size={30} />
                                                    ) : (
                                                        "Save"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

export default UserInfoForm
