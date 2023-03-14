import React from 'react'
import "./ViewStatisticsChart.scss";
import BarChart from '../../../../global/Chart/BarChart/BarChart';

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

const data = {
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

function ViewStatisticsChart() {
  return (
    <div className="View__statistics__chart">
      <BarChart 
      name={"Thống kê lượt xem"}
      totalRenuve={"Tổng: 102.000"}
      data={data}
      options={options}
       />
    </div>
  )
}

export default ViewStatisticsChart