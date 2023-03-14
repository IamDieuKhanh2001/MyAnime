import React, { useEffect, useState } from 'react'
import "./TopupPackageChart.scss";
import PieChart from '../../../../global/Chart/PieChart/PieChart';
import { APIGetAllSubscriptionPackage } from '../../../../../api/axios/Subscription';

function TopupPackageChart() {
    const [loadingTopupPackageStatistic, setLoadingTopupPackageStatistic] = useState(false)
    const [totalPackagePaid, setTotalPackagePaid] = useState(0)
    const [dataChart, setDataChart] = useState(
        {
            labels: ['1 month premium', '3 month premium', "12 month premium"],
            datasets: [
                {
                    label: 'topupPackage',
                    data: [10, 10, 10],
                    backgroundColor: [
                        'rgba(129, 96, 224, 0.8)',
                        'rgba(116, 224, 96, 0.8)',
                        'rgba(228, 229, 78, 0.8)'
                    ],
                    borderColor: [
                        'rgba(129, 96, 224, 0.8)',
                        'rgba(116, 224, 96, 0.8)',
                        'rgba(228, 229, 78, 0.8)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    );
    const options = { //Pie chart option 
        //This chart use default option
    };

    const loadTopUpPackage = async () => {
        setLoadingTopupPackageStatistic(true)
        const resGetTopUpPackage = await APIGetAllSubscriptionPackage();
        if (resGetTopUpPackage?.status === 200) {
            setDataChart(
                {
                    labels: resGetTopUpPackage?.data.map((itemPackage) => (itemPackage.name)), //Get label sort
                    datasets: [
                        {
                            label: 'topupPackage',
                            data: resGetTopUpPackage?.data.map((itemPackage) => (itemPackage.numberOfTopUp)), //Get number of paid package
                            backgroundColor: [
                                'rgba(129, 96, 224, 0.8)',
                                'rgba(116, 224, 96, 0.8)',
                                'rgba(228, 229, 78, 0.8)'
                            ],
                            borderColor: [
                                'rgba(129, 96, 224, 0.8)',
                                'rgba(116, 224, 96, 0.8)',
                                'rgba(228, 229, 78, 0.8)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }
            )
        }
        setLoadingTopupPackageStatistic(false)
    }

    const calculateTotalPackagePaid = async () => {
        const resGetTopUpPackage = await APIGetAllSubscriptionPackage();
        let totalPackagePaid;
        if (resGetTopUpPackage?.status === 200) {
            totalPackagePaid = resGetTopUpPackage?.data
                .map((itemPackage) => (itemPackage.numberOfTopUp))
                .reduce((total, numberOfTopUp) => total + numberOfTopUp, 0);
            setTotalPackagePaid(totalPackagePaid)
        }
    }

    useEffect(() => {
        loadTopUpPackage()
        calculateTotalPackagePaid()
    }, [])

    return (
        <div className="topup__package__chart">
            <PieChart
                name="Gói nâng cấp tài khoản"
                totalRenuve={`Tổng gói đã được mua ${totalPackagePaid}`}
                data={dataChart}
                options={options}
            />
        </div>
    )
}

export default TopupPackageChart