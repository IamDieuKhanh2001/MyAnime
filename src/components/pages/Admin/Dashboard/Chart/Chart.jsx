import React from "react";
import "./Chart.scss";
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Total movie visits",
    // },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Last year",
      data: labels.map(() => Math.random({ min: 0, max: 1000 })),
      backgroundColor: "#9e0902",
      borderRadius: "3",
    },
    {
      label: "This year",
      data: labels.map(() => Math.random({ min: 0, max: 1000 })),
      backgroundColor: "#fff",
      borderRadius: "3",
    },
  ],
};

export default function Chart() {
  return (
    <div className="chart">
      <div className="chartHeading">
        <div className="headingTitle">
          <h4 className="title">TOTAL VISITS</h4>
          <h4 className="renuve">100.000</h4>
        </div>
      </div>
      <div className="chartBar">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
