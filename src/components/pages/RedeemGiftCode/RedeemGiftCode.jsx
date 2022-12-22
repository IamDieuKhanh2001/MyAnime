import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";

import "./RedeemGiftCode.scss"
import Header from '../../global/Header/Header';
import Footer from '../../global/Footer/Footer';
import RedeemHeader from './RedeemHeader/RedeemHeader';
import { APIUserRedeemGiftcode } from '../../../api/axios/Subscription';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

function RedeemGiftCode() {
    const avatar = window.sessionStorage.getItem("avatar");
    const username = window.sessionStorage.getItem("username");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Emty code"),
        }),
        onSubmit: async values => {
            if (values !== "") {
                userRedeemCode(values.code)
            }
        }
    });

    const userRedeemCode = async (redemptionCode) => {
        console.log("Calling api redeem");
        setLoading(true)
        const resUserRedeemCode = await APIUserRedeemGiftcode(redemptionCode);
        console.log(resUserRedeemCode)
        if (resUserRedeemCode?.status === 200) {
            toast.success("Redeem success")
        } else {
            toast.error("GiftCode invalid or has been used")
        }
        setLoading(false)
    };



    useEffect(() => {
        if (username === null) {
            navigate(`/login`)
        }
    }, [])

    return (
        <div className="redeem">
            <Header />
            <div className="container">
                <div className="redeem__body">
                    <div className="wrapper row  d-flex  justify-content-center">
                        <form className="redeem__form" onSubmit={formik.handleSubmit}>
                            <p className="title">Redeem Premium</p>
                            <RedeemHeader avatarUrl={avatar} username={username} />
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
                            <button
                                type="submit"
                                className="submit"
                                disabled={loading}>
                                {loading ?
                                    (
                                        <React.Fragment>
                                            <BeatLoader
                                                speedMultiplier={0.8}
                                                margin={4.3}
                                                size={14}
                                                color="#fff"
                                            />
                                        </React.Fragment>
                                    ) :
                                    (<React.Fragment>
                                        Redeem now
                                    </React.Fragment>)
                                }
                            </button>
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