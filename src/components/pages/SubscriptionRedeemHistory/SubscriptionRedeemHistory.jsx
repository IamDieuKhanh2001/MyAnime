import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIGetRemainTimePremiumMember } from '../../../api/axios/customerAPI';
import { APIGetSubscriptionHistory } from '../../../api/axios/Subscription';
import { Layout } from '../../global/Layout/Layout'
import NormalBreadcrumb from '../../global/NormalBreadcrumb/NormalBreadcrumb'
import PaymentPackageDialog from '../../global/PaymentPackageModal/PaymentPackageDialog/PaymentPackageDialog';
import "./SubscriptionRedeemHistory.scss"

function SubscriptionRedeemHistory() {
    const [subscriptionHistory, setSubscriptionHistory] = useState([])
    const [openPackageDialog, setOpenPackageDialog] = useState(false);
    const [premiumDayRemain, setPremiumDayRemain] = useState(0);

    const username = window.sessionStorage.getItem("username");
    const avatar = window.sessionStorage.getItem("avatar");

    const navigate = useNavigate();

    const loadSubscriptionHistory = async () => {
        console.log("Calling api sub history");
        const resGetSubHistory = await APIGetSubscriptionHistory();
        console.log(resGetSubHistory)
        if (resGetSubHistory?.status === 200) {
            setSubscriptionHistory(resGetSubHistory.data)
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

    const handleClickOpenPackageDialog = () => {
        setOpenPackageDialog(true);
    };

    const handleRedeemNavigate = () => {
        navigate(`/redeem`)
    };

    useEffect(() => {
        loadSubscriptionHistory()
        getRemainTimePremiumMember()
    }, [])
    return (
        <Layout>
            <NormalBreadcrumb
                title={"Subscription History"}
                description={"Your current subscription history and redeemed."}
            />
            <div className="products">
                <div className="product spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                        <div className="section-title">
                                            <h4>Info</h4>
                                        </div>
                                        <div className='d-flex align-items-center py-3 col-12 col-sm-12 '>
                                            <div className='position-relative d-block' style={{ width: '60px', height: '60px' }}>
                                                <img className='d-block w-100 h-100 rounded-circle position-absolute' style={{ top: 0, left: 0 }}
                                                    src={avatar} alt="true" />
                                            </div>
                                            <div className='ml-4 w-0' style={{ flex: 1 }}>
                                                <div className='d-flex w-100 flex-column justify-content-start' style={{ fontWeight: '700' }}>
                                                    <span className='text-white font-weight-bold'>
                                                        {username}
                                                    </span>
                                                    <h5><span className="badge badge-secondary" style={{ backgroundColor: "#DA5776" }}>Premium member</span></h5>
                                                </div>
                                                <p style={{ fontSize: '14px', lineHeight: '15px', fontWeight: '400', color: '#999', wordBreak: 'break-word' }} className='mt-1'>
                                                    Premium remain {premiumDayRemain} Day
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-12 col-sm-12 pb-5'>
                                            <button onClick={handleClickOpenPackageDialog} type="button" className="btn btn-success" style={{backgroundColor: "#9F5AFD",  border: "2px solid #9F5AFD", fontWeight: "700"}}>Gia hạn thêm premium</button>
                                            <button onClick={handleRedeemNavigate} type="button" className="btn btn-outline-success ml-3 hov-redeem-btn" style={{color: "#9F5AFD", border: "2px solid #9F5AFD", fontWeight: "700"}}>Đổi mã quà tặng</button>
                                        </div>
                                        <PaymentPackageDialog open={openPackageDialog} setOpen={setOpenPackageDialog} />
                                    </div>
                                </div>
                                <div className="row">

                                </div>
                                <div className="popular__product">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="section-title">
                                                <h4>Your current subscription detail</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <table className="table table-striped bg-white">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Subscribe Date</th>
                                                    <th scope="col">Expired At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subscriptionHistory.map((item) => (
                                                    <tr>
                                                        <th scope="row">{item.id}</th>
                                                        <td>{item.subscribeDate}</td>
                                                        <td>{item.expiredAt}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SubscriptionRedeemHistory
