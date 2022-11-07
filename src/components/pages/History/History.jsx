import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../global/Layout/Layout'
import NormalBreadcrumb from '../../global/NormalBreadcrumb/NormalBreadcrumb'
import HistorySection from './HistorySection/HistorySection';

function History() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [historyToday, setHistoryToday] = useState([])
    const [historyEarlier, setHistoryEarlier] = useState([])

    const login = window.sessionStorage.getItem("jwt");

    const historyList = useSelector((state) => state.histories.list);

    const sortHistory = () => {
        let historyTodayList = []
        let historyEarlierList = []
        let currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0);

        historyList.map((history) => {
            const historyDate = new Date(history.createAt);
            historyDate.setHours(0, 0, 0, 0);
            if (historyDate.getTime() === currentDate.getTime()) {
                historyTodayList.push(history)
            } else {
                historyEarlierList.push(history)
            }
        })
        setHistoryToday(historyTodayList)
        setHistoryEarlier(historyEarlierList)
    }

    useEffect(() => {
        sortHistory()
    }, [])
    return (
        <Layout>
            <NormalBreadcrumb title={"Recent history"}
                description={"Your recent watching series."} />
            <div className="products">
                <div className="product spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="popular__product">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="section-title">
                                                <h4>Today</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {historyToday.map((history, index) => (
                                            <HistorySection data={history} key={index} />
                                        ))}

                                        {/* {loading ?
                                            (<LoadingAnimation />) : (
                                                <React.Fragment>
                                                    {product.map((data, index) => (
                                                        <ProductSection data={data} key={index} />
                                                    ))}
                                                </React.Fragment>)} */}
                                    </div>
                                </div>
                                <div className="recent__product">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="section-title">
                                                <h4>Earlier</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {historyEarlier.map((history, index) => (
                                            <HistorySection data={history} key={index} />
                                        ))}
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

export default History
