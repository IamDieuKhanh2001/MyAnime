import React from 'react'
import "./PremiumChart.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Premium User', 'Normal User'],
    datasets: [
        {
            label: 'UserExclusive',
            data: [12, 19],
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
};

function PremiumChart() {
    return (
        <div className="premium__chart">
            <div className="chartHeading">
                <div className="headingTitle">
                    <h4 className="title">Cấp bậc người dùng</h4>
                    <h4 className="renuve">Total: 300</h4>
                </div>
            </div>
            <div className="pie__chart">
                <Pie data={data} />
            </div>
        </div>

    )
}

export default PremiumChart