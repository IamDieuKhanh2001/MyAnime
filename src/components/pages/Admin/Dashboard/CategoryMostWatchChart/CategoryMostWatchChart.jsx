import React from 'react'
import "./CategoryMostWatchChart.scss";
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
  "Live Action",
  "Hành động",
  "Trinh thám",
  "Harem",
  "Chuyển sinh",
  "Hài hước",
  "Siêu nhiên",
  "Đời thường",
  "Âm nhạc",
  "Thể thao",
  "Phiêu lưu",
  "Lãng mạn",
  "Học đường",
  "Fantasy",
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
function CategoryMostWatchChart() {
  return (
    <div className="category__most__watch__chart">
      <div className="chartHeading">
        <div className="headingTitle">
          <h4 className="title">Lượt xem theo thể loại</h4>
          <h4 className="renuve">100.000</h4>
        </div>
      </div>
      <div className="chartBar">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default CategoryMostWatchChart