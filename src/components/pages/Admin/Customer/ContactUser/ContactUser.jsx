import { Field, Form, Formik, useField } from 'formik'
import React from 'react'
import { toast } from 'react-toastify';
import * as Yup from "yup"

function ContactUser() {
    const initialValues = {
        gmailAddress: "",
        title: "",
        message: "",
    };

    const validationSchema = Yup.object().shape({
        quantity: Yup
            .number()
            .typeError('Quantity must be a number')
            .positive('Quantity must be greater than zero')
            .required("Empty"),
        subscriptionPackId: Yup
            .object()
            .required("Empty"),
    });
    const onSubmit = async (fields, resetForm) => {

        toast.success(`Create gift code success`)

    };

    const MessageTextArea = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and alse replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <textarea rows={"8"} className="text-area form-control" {...field} {...props} />
            </>
        );
    };

    return (
        <React.Fragment>
            <Formik
                initialValues={initialValues || null}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                enableReinitialize
            >
                {({ setFieldValue, errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="container px-4 mt-4">
                            <div className="row">
                                <div className="col-xl-7">
                                    <div className="card mb-4">
                                        <div className="card-header">Send mail</div>
                                        <div className="card-body">
                                            <div className="addForm">
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputGmailAddress">
                                                        Gmail address
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputName"
                                                        type="text"
                                                        name="gmailAddress"
                                                        placeholder="Enter gmail Address"
                                                    />
                                                    <span className="error">
                                                        {errors.gmailAddress && touched.gmailAddress && (
                                                            <div>{errors.gmailAddress}</div>
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputmovieName"
                                                    >
                                                        Title
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputName"
                                                        type="text"
                                                        name="quantity"
                                                        placeholder="Enter Title"
                                                    />
                                                    <span className="error">
                                                        {errors.title && touched.title && (
                                                            <div>{errors.title}</div>
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="mb-3">
                                                    <MessageTextArea
                                                        label={"Message send"}
                                                        name="message"
                                                        placeholder="Write your message here ..."
                                                    />
                                                    <span className="error">
                                                        {errors.message && touched.message && (
                                                            <div>{errors.message}</div>
                                                        )}
                                                    </span>
                                                </div>
                                                <button className="btn btn-danger px-4" type="submit">
                                                    {isSubmitting && (
                                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                                    )}
                                                    Send
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

export default ContactUser