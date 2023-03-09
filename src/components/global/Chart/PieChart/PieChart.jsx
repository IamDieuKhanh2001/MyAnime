import React from 'react'
import { Pie } from 'react-chartjs-2';
import "./PieChart.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({name, totalRenuve, data, options}) {
    return (
        <React.Fragment>
            <div className="chartHeading">
                <div className="headingTitle">
                    <h4 className="title">{name}</h4>
                    <h4 className="renuve">{totalRenuve}</h4>
                </div>
            </div>
            <div className="pie__chart">
                <Pie data={data} option={options}/>
            </div>
        </React.Fragment>
    )
}

export default PieChart