import React, { useEffect, useState } from 'react'
import "./ViewStatisticsChart.scss";
import BarChart from '../../../../global/Chart/BarChart/BarChart';
import { APIGetTotalViewInYear, APIGetViewStatisticByYear } from '../../../../../api/axios/StatisticAPI';

function ViewStatisticsChart() {
  const [loadingViewStatistics, setLoadingViewStatistics] = useState(false)
  const [totalView, setTotalView] = useState(0)
  const [dataChart, setDataChart] = useState(
    {
      labels: [
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
      ],
      datasets: [
        {
          label: "Last year",
          data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          backgroundColor: "#9e0902",
          borderRadius: "3",
        },
        {
          label: "This year",
          data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          backgroundColor: "#fff",
          borderRadius: "3",
        },
      ],
    }
  );
  const options = {
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

  const loadViewStatistics = async () => {
    const currentYear = new Date().getFullYear();
    const lastYear = new Date().getFullYear() - 1;

    setLoadingViewStatistics(true)
    const resGetViewStatisticsInCurrentYear = await APIGetViewStatisticByYear(currentYear); //API current year
    const resGetViewStatisticsInLastYear = await APIGetViewStatisticByYear(lastYear); //API last year
    if (resGetViewStatisticsInCurrentYear?.status === 200 && resGetViewStatisticsInLastYear?.status === 200) {
      setDataChart(
        {
          labels: resGetViewStatisticsInCurrentYear?.data.map((item) => (item.month)),
          datasets: [
            {
              label: `Last year ${lastYear}`,
              data: resGetViewStatisticsInLastYear?.data.map((item) => (item.totalView)),
              backgroundColor: "#9e0902",
              borderRadius: "3",
            },
            {
              label: `Current year ${currentYear}`,
              data: resGetViewStatisticsInCurrentYear?.data.map((item) => (item.totalView)),
              backgroundColor: "#fff",
              borderRadius: "3",
            },
          ],
        }
      )
    }
    setLoadingViewStatistics(false)
  }

  const calculateTotalViewInCurrentYear = async () => {
    const currentYear = new Date().getFullYear();
    const resGetTotalViewInCurrentYear = await APIGetTotalViewInYear(currentYear);
    if (resGetTotalViewInCurrentYear?.status === 200) {
      setTotalView(resGetTotalViewInCurrentYear.data?.totalView)
    }
  }

  useEffect(() => {
    loadViewStatistics()
    calculateTotalViewInCurrentYear()
  }, [])

  return (
    <div className="View__statistics__chart">
      <BarChart
        name={"Thống kê lượt xem"}
        totalRenuve={`Tổng lượt xem năm nay: ${totalView}`}
        data={dataChart}
        options={options}
      />
    </div>
  )
}

export default ViewStatisticsChart