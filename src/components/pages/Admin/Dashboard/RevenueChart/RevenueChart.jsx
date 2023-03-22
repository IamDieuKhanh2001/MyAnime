import React from "react";
import "./RevenueChart.scss";
import BarChart from "../../../../global/Chart/BarChart/BarChart";
import { useState } from "react";
import { useEffect } from "react";
import { APIGetRevenueStatisticsInYear } from "../../../../../api/axios/StatisticAPI";

export default function RevenueChart() {
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
  const [loadingRevenueChart, setLoadingRevenueChart] = useState(false)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [dataChart, setDataChart] = useState(
    {
      labels,
      datasets: [
        {
          label: "Last year",
          data: [],
          backgroundColor: "#9e0902",
          borderRadius: "3",
        },
        {
          label: "This year",
          data: [],
          backgroundColor: "#fff",
          borderRadius: "3",
        },
      ],
    }
  )

  const options = {
    //Options for revenue chart
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

  const loadRevenueStatistics = async () => {
    const currentYear = new Date().getFullYear();
    const lastYear = new Date().getFullYear() - 1;

    setLoadingRevenueChart(true)
    const resGetRevenueInCurrentYear = await APIGetRevenueStatisticsInYear(currentYear); //API current year
    const resGetRevenueInLastYear = await APIGetRevenueStatisticsInYear(lastYear); //API last year
    if (resGetRevenueInCurrentYear?.status === 200 && resGetRevenueInLastYear?.status === 200) {
      setDataChart(
        {
          labels: resGetRevenueInCurrentYear?.data.map((item) => (item.month)),
          datasets: [
            {
              label: "Last year",
              data: resGetRevenueInLastYear?.data.map((item) => (item.totalRevenue)),
              backgroundColor: "#9e0902",
              borderRadius: "3",
            },
            {
              label: "This year",
              data: resGetRevenueInCurrentYear?.data.map((item) => (item.totalRevenue)),
              backgroundColor: "#fff",
              borderRadius: "3",
            },
          ],
        }
      )
      calculateTotalRevenue(resGetRevenueInCurrentYear?.data)
    }
    setLoadingRevenueChart(false)
  }

  const calculateTotalRevenue = async (data) => {
    let totalRevenue = 0
    totalRevenue = data.map((item) => (item.totalRevenue))
    .reduce((total, totalRevenue) => total + totalRevenue, 0);
    setTotalRevenue(totalRevenue);
  }

  useEffect(() => {
    loadRevenueStatistics()
  }, [])

  return (
    <div className="revenue__chart">
      <BarChart
        name={"Tổng doanh thu:"}
        totalRenuve={`Tổng năm nay (USD): ${totalRevenue}`}
        data={dataChart}
        options={options}
      />
    </div>
  );
}
