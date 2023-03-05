import React from 'react'
import "./TopupPackageChart.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
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
};

function TopupPackageChart() {
    return (
        <div className="topup__package__chart">
            <div className="chartHeading">
                <div className="headingTitle">
                    <h4 className="title">Gói nâng cấp tài khoản</h4>
                    <h4 className="renuve">Tổng lượt mua: 500</h4>
                </div>
            </div>
            <div className="pie__chart">
                <Pie data={data} />
            </div>
        </div>
    )
}

export default TopupPackageChart