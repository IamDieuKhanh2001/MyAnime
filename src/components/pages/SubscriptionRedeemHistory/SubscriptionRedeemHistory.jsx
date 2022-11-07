import React, { useEffect } from 'react'
import { useState } from 'react';
import { APIGetSubscriptionHistory } from '../../../api/axios/Subscription';
import { Layout } from '../../global/Layout/Layout'
import NormalBreadcrumb from '../../global/NormalBreadcrumb/NormalBreadcrumb'

function SubscriptionRedeemHistory() {
    const [subscriptionHistory, setSubscriptionHistory] = useState([])

    const loadSubscriptionHistory = async () => {
        console.log("Calling api sub history");
        const resGetSubHistory = await APIGetSubscriptionHistory();
        console.log(resGetSubHistory)
        if (resGetSubHistory?.status === 200) {
            setSubscriptionHistory(resGetSubHistory.data)
        }
    };

    useEffect(() => {
        loadSubscriptionHistory()
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
                                <div className="popular__product">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="section-title">
                                                <h4>Your current subscription detail</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <table class="table table-striped bg-white">
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
