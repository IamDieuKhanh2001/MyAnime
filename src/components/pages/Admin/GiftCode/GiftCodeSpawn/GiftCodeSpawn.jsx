import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"
import _ from "lodash";
import { APIGetAllSubscriptionPackage, APIGiftCodeSpawn } from '../../../../../api/axios/Subscription';
import LoadingAnimation from '../../../../global/LoadingAnimation/LoadingAnimation';
import SelectSubscriptionPackageDropdown from '../SelectSubscriptionPackageDropdown/SelectSubscriptionPackageDropdown';


function GiftCodeSpawn() {
    const [formValues, setFormValues] = useState(null);
    const [loadingPackage, setLoadingPackage] = useState(false)
    const [subscriptionPackageList, setSubscriptionPackageList] = useState([])

    const initialValues = {
        quantity: "",
        subscriptionPackId: "",
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

    const loadSubscriptionPackage = async () => {
        setLoadingPackage(true)
        const resGetPackage = await APIGetAllSubscriptionPackage();
        if (resGetPackage?.status === 200) {
            setSubscriptionPackageList(resGetPackage.data)
        }
        setLoadingPackage(false)
    }

    const onSubmit = async (fields, resetForm) => {
        try {
            const resSpawnGiftCode = await APIGiftCodeSpawn(fields.subscriptionPackId.value, fields.quantity)
            if(resSpawnGiftCode?.status === 200) {
                resetForm()
                toast.success(`Create gift code success`)
            }
        } catch (e) {
            toast.error(`Create gift code fail`)
        }
    };

    useEffect(() => {
        // loadMovies()
        loadSubscriptionPackage()
    }, [])

    return (
        <React.Fragment>
            <Formik
                initialValues={initialValues || formValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                enableReinitialize
            >
                {({ setFieldValue, errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="container-xl px-4 mt-4">
                            <div className="row">
                                <div className="col-xl-7">
                                    <div className="card mb-4">
                                        <div className="card-header">Spawn gift code</div>
                                        <div className="card-body">
                                            <div className="addForm">
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputQuantity">
                                                        Quantity
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputName"
                                                        type="text"
                                                        name="quantity"
                                                        placeholder="Enter quantity"
                                                    />
                                                    <span className="error">
                                                        {errors.quantity && touched.quantity && (
                                                            <div>{errors.quantity}</div>
                                                        )}
                                                    </span>
                                                </div>
                                                {
                                                    loadingPackage ?
                                                        <LoadingAnimation />
                                                        : (
                                                            <div className="mb-3">
                                                                <label
                                                                    className="small mb-1"
                                                                    htmlFor="inputmovieName"
                                                                >
                                                                    Subscription package
                                                                </label>
                                                                <Field
                                                                    component={SelectSubscriptionPackageDropdown}
                                                                    name="subscriptionPackId"
                                                                    options={subscriptionPackageList.map(sp => {
                                                                        return ({
                                                                            value: sp.id,
                                                                            label: sp.name
                                                                        })
                                                                    })}
                                                                />
                                                                <span className="error">
                                                                    {errors.subscriptionPackId && touched.subscriptionPackId && (
                                                                        <div>{errors.subscriptionPackId}</div>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )

                                                }
                                                <button className="btn btn-danger px-4" type="submit">
                                                    {isSubmitting && (
                                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                                    )}
                                                    Spawn
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

export default GiftCodeSpawn