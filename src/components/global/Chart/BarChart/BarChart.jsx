import React from 'react'
import "./BarChart.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ name, totalRenuve, data, options }) {
    return (
        <React.Fragment>
            <div className="chartHeading">
                <div className="headingTitle">
                    <h4 className="title">{name}</h4>
                    <h4 className="renuve">{totalRenuve}</h4>
                </div>
            </div>
            <div className="bar__chart">
                <Bar options={options} data={data} />
            </div>
        </React.Fragment>
    )
}

export default BarChart