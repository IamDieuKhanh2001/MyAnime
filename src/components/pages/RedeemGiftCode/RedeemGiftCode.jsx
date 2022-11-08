import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";

import "./RedeemGiftCode.scss"
import Header from '../../global/Header/Header';
import Footer from '../../global/Footer/Footer';
import { fontWeight } from '@mui/system';
import RedeemHeader from './RedeemHeader/RedeemHeader';

function RedeemGiftCode() {
    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Emty code"),
        }),
        onSubmit: async values => {

        }
    });
    return (
        <div className="redeem">
            <Header />
            <div className="container">
                <div className="redeem__body">
                    <div className="wrapper row  d-flex  justify-content-center">
                        <form className="redeem__form" onSubmit={formik.handleSubmit}>
                            <p className="title">Redeem Premium</p>
                            <RedeemHeader avatarUrl={"/img/avatar/avatar.jpg"} />
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="code"
                                    placeholder="Please enter the redemption code"
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                />
                                <span className="error">
                                    {formik.errors.code && formik.touched.code && (
                                        <div>{formik.errors.code}</div>
                                    )}
                                </span>
                            </div>
                            <input type="submit" value="Redeem now" className="submit" />
                            <div className="middle">
                                <div className="cutSection" />
                                <div className="cutSection" />
                            </div>
                            <div className='redeem__footer'>
                                <h1>Redemption Instructions</h1>
                                <div className='redeem__footer__tip'>
                                    1.Your Premium will soon take effect after you redeem it successfully
                                </div>
                                <div className='redeem__footer__tip'>
                                    2.If you're already a Premium, its duration will be prolonged accordingly
                                </div>
                                <a
                                    href='https://www.bilibili.tv/marketing/protocal/big-protocol-en.html'
                                    className=''>
                                    MyAnime Premium Service Agreement
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RedeemGiftCode