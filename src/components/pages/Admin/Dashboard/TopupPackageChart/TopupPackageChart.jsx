import React, { useState } from 'react'
import "./TopupPackageChart.scss";
import PieChart from '../../../../global/Chart/PieChart/PieChart';

function TopupPackageChart() {
    const [loadingTopupPackageStatistic, setLadingTopupPackageStatistic] = useState(false)
    const [dataChart, setDataChart] = useState(
        {
            labels: ['1 month premium', '3 month premium', "12 month premium"],
            datasets: [
                {
                    label: 'topupPackage',
                    data: [12, 19, 37],
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

    return (
        <div className="topup__package__chart">
            <PieChart
                name="Gói nâng cấp tài khoản"
                totalRenuve={`Tổng gói đã được mua 300.000`}
                data={dataChart}
                options={options}
            />
        </div>
    )
}

export default TopupPackageChart