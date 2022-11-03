import React from "react";
import "./VerifyForm.scss";
import { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

export default function VerifyForm() {
    const [uploadFile, setUploadFile] = useState();
    const [formValues, setFormValues] = useState(null);
    const [previewImg, setPreviewImg] = useState();
    const initialValues = {
        idNumber: "",
        dob: "",
        dateStarted: "",
        issuedBy: "",
        expiredDate: "",
    };

    const validationSchema = Yup.object().shape({
        idNumber: Yup.string().required("Empty"),
        dob: Yup.string().required("Empty"),
        dateStarted: Yup.string().required("Empty"),
        issuedBy: Yup.string().required("Empty"),
        expiredDate: Yup.string().required("Empty"),
    });

    const imageHandler = (e, setFieldValue) => {
        if (e.target.files[0]) {
            setUploadFile(e.target.files[0]);
            setFieldValue("photo", e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setPreviewImg(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onSubmit = async (fields) => {
        console.log(fields);
    };

    return (
        <div className="authenId">
            <Formik
                initialValues={initialValues || formValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) =>
                    onSubmit(values, resetForm)
                }
                enableReinitialize
            >
                {({ setFieldValue, errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="container-xl px-4 mt-4">
                            <div className="row">
                                <div className="col-xl-7">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            Information
                                        </div>
                                        <div className="card-body">
                                            <div className="addForm">
                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputId"
                                                    >
                                                        Identity Number
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputId"
                                                        type="text"
                                                        name="idNumber"
                                                        placeholder="Enter your id number"
                                                    />
                                                    <span className="error">
                                                        {errors.idNumber &&
                                                            touched.idNumber && (
                                                                <div>
                                                                    {
                                                                        errors.idNumber
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputdob"
                                                    >
                                                        Date of Birth
                                                    </label>
                                                    <Field
                                                        name="dob"
                                                        className="form-control"
                                                        id="inputdob"
                                                        type="date"
                                                        placeholder="Enter your date of birth"
                                                    />
                                                    <span className="error">
                                                        {errors.dob &&
                                                            touched.dob && (
                                                                <div>
                                                                    {errors.dob}
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputDateStarted"
                                                    >
                                                        Started Date
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputDateStarted"
                                                        type="date"
                                                        name="dateStarted"
                                                        placeholder="Enter your started date"
                                                    />
                                                    <span className="error">
                                                        {errors.dateStarted &&
                                                            touched.dateStarted && (
                                                                <div>
                                                                    {
                                                                        errors.dateStarted
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputExpiredDate"
                                                    >
                                                        Expired Date
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputExpiredDate"
                                                        name="expiredDate"
                                                        placeholder="Enter your expired date"
                                                        type="date"
                                                    />
                                                    <span className="error">
                                                        {errors.expiredDate &&
                                                            touched.expiredDate && (
                                                                <div>
                                                                    {
                                                                        errors.expiredDate
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputIssuedBy"
                                                    >
                                                        Issued By
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputIssuedBy"
                                                        type="text"
                                                        name="issuedBy"
                                                        placeholder="Enter your issued by"
                                                    />
                                                    <span className="error">
                                                        {errors.issuedBy &&
                                                            touched.issuedBy && (
                                                                <div>
                                                                    {
                                                                        errors.issuedBy
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <button
                                                    className="btn btn-danger px-4"
                                                    type="submit"
                                                >
                                                    {isSubmitting && (
                                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                                    )}
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-5">
                                    <div className="card mb-4 mb-xl-0">
                                        <div className="card-header text-center">
                                            Identity Card
                                        </div>
                                        <div className="card-body text-center">
                                            <label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="imageBtn"
                                                    id="input"
                                                    onChange={(e) =>
                                                        imageHandler(
                                                            e,
                                                            setFieldValue
                                                        )
                                                    }
                                                />
                                                <img
                                                    className="img-id-card mb-2"
                                                    src={
                                                        previewImg
                                                            ? previewImg
                                                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAQlBMVEX///83QVExPE1nbno0P08pNUczPU4hL0JqcXwrNkh8gYpASlk9R1YbKj/29/fJy86WmqJ2fIa8v8PO0dSbn6WTl54j9ueIAAAB9ElEQVR4nO3d3W6CQBRFYRlBRJAfoe//qkWbpq1OgxcDJ/uwvnubWZmiQk7GwwEAAAAAAAAAAAAAAAAAAAAAAABm2q6/DJe+a60XspJ2asoqhFCVzYfLxjEUefYlL8JovZz0btfvvkfj9Wa9oNTG4nfgfRud7WJbn7K/TrWva7EvsmdFb72opKqXwCyrrBeVUldGCsvOelkJTdE9nKyXldAQIoVhsF5WQsdo4dF6WQlRqI9CfRTqo1Afhfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9Z2jhWfrZb2nm4bjknMdCcyy+rz4ymEyHmdo++oxjLckGjjv4rL57/eGo0Vj8zoIlF5Rmw2I3YrnUa51nAqjMb/xmi+vLon8arOLYavAOTFYXIuRYbz1WIz5tc12WzhvYrP9JkaH8dZjMObXx4bx1lNt/296+e9jfB3hsnlhdNxwxcLtBxn976H/69D/e6n/z0P/32l28L10B/cW/u8P512sN7gWc8N7/B08p7lz/qztXdLPS9/i/5k3hfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9VGoj0J9FOqjUJ//cxP9n33p//xS/2fQ7uAcYf9nQfs/z3sHZ7Lv4Fz92c9vI/h6k/nF++9bAAAAAAAAAAAAAAAAAAAAAAAASPgEMhkeszVVYGcAAAAASUVORK5CYII="
                                                    }
                                                    alt="avatar"
                                                    id="img"
                                                />
                                            </label>

                                            <div className="small font-italic text-muted mb-4">
                                                Front
                                            </div>
                                        </div>

                                        <div className="card-body img-second text-center">
                                            <label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="imageBtn"
                                                    id="input"
                                                    onChange={(e) =>
                                                        imageHandler(
                                                            e,
                                                            setFieldValue
                                                        )
                                                    }
                                                />
                                                <img
                                                    className="img-id-card mb-2"
                                                    src={
                                                        previewImg
                                                            ? previewImg
                                                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAQlBMVEX///83QVExPE1nbno0P08pNUczPU4hL0JqcXwrNkh8gYpASlk9R1YbKj/29/fJy86WmqJ2fIa8v8PO0dSbn6WTl54j9ueIAAAB9ElEQVR4nO3d3W6CQBRFYRlBRJAfoe//qkWbpq1OgxcDJ/uwvnubWZmiQk7GwwEAAAAAAAAAAAAAAAAAAAAAAABm2q6/DJe+a60XspJ2asoqhFCVzYfLxjEUefYlL8JovZz0btfvvkfj9Wa9oNTG4nfgfRud7WJbn7K/TrWva7EvsmdFb72opKqXwCyrrBeVUldGCsvOelkJTdE9nKyXldAQIoVhsF5WQsdo4dF6WQlRqI9CfRTqo1Afhfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9Z2jhWfrZb2nm4bjknMdCcyy+rz4ymEyHmdo++oxjLckGjjv4rL57/eGo0Vj8zoIlF5Rmw2I3YrnUa51nAqjMb/xmi+vLon8arOLYavAOTFYXIuRYbz1WIz5tc12WzhvYrP9JkaH8dZjMObXx4bx1lNt/296+e9jfB3hsnlhdNxwxcLtBxn976H/69D/e6n/z0P/32l28L10B/cW/u8P512sN7gWc8N7/B08p7lz/qztXdLPS9/i/5k3hfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9VGoj0J9FOqjUJ//cxP9n33p//xS/2fQ7uAcYf9nQfs/z3sHZ7Lv4Fz92c9vI/h6k/nF++9bAAAAAAAAAAAAAAAAAAAAAAAASPgEMhkeszVVYGcAAAAASUVORK5CYII="
                                                    }
                                                    alt="avatar"
                                                    id="img"
                                                />
                                            </label>

                                            <div className="small font-italic text-muted mb-4">
                                                Behind
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
