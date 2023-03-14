import React, { useEffect, useState } from 'react'
import "./PremiumChart.scss";
import { APIGetUserStatistic } from '../../../../../api/axios/StatisticAPI';
import PieChart from '../../../../global/Chart/PieChart/PieChart';

function PremiumChart() {
    const [loadingUserStatistic, setLoadingUserStatistic] = useState(false)
    const [allUserNumber, setAllUserNumber] = useState(0)
    const [dataChart, setDataChart] = useState(
        {
            labels: ['Premium User', 'Normal User'],
            datasets: [
                {
                    label: 'UserExclusive',
                    data: [10, 10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(191, 191, 191, 0.7)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(191, 191, 191, 0.7)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    );

    const options = { //Pie chart option 
        //This chart use default option
    };

    const loadUserStatistic = async () => {
        setLoadingUserStatistic(true)
        const resGetUserStatistic = await APIGetUserStatistic();
        if (resGetUserStatistic?.status === 200) {
            setDataChart({
                labels: ['Premium User', 'Normal User'],
                datasets: [
                    {
                        label: 'UserExclusive',
                        data: [
                            resGetUserStatistic.data.premiumUserNumber,
                            resGetUserStatistic.data.normalUserNumber
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(191, 191, 191, 0.7)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(191, 191, 191, 0.7)',
                        ],
                        borderWidth: 1,
                    },
                ],
            })
            setAllUserNumber(resGetUserStatistic.data.allUserNumber)
        }
        setLoadingUserStatistic(false)
    }

    useEffect(() => {
        loadUserStatistic()
    }, [])

    return (
        <div className="premium__chart">
            <PieChart
                name="Cấp bậc người dùng"
                totalRenuve={`Tổng người dùng ${allUserNumber}`}
                data={dataChart}
                options={options}
            />
        </div>

    )
}

export default PremiumChart