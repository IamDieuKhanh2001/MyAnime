import React, { useEffect, useState } from 'react'
import "./CategoryMostWatchChart.scss";
import BarChart from '../../../../global/Chart/BarChart/BarChart';
import { APIGetCategoriesViewStatistics } from '../../../../../api/axios/StatisticAPI';

function CategoryMostWatchChart() {
  const [loadingCategoryMostWatchChart, setLoadingCategoryMostWatchChart] = useState(false)
  const [totalView, setTotalView] = useState(0)
  const [dataChart, setDataChart] = useState(
    {
      labels: [
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
      ],
      datasets: [
        {
          label: "Category most watch",
          data: [10, 10, 10],
          backgroundColor: "#fff",
          borderRadius: "3",
        },
      ],
    }
  )

  const options = { 
    //Options for CategoryMostWatch Chart 
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
  const loadCategoriesViewStatistics = async () => {
    setLoadingCategoryMostWatchChart(true)
    const resGetCategoriesViewStatistics = await APIGetCategoriesViewStatistics();
    if (resGetCategoriesViewStatistics?.status === 200) {
      setDataChart(
        {
          labels: resGetCategoriesViewStatistics?.data.map((item) => (item.categoryName)),
          datasets: [
            {
              label: "Category view total",
              data: resGetCategoriesViewStatistics?.data.map((item) => (item.totalView)),
              backgroundColor: "#9E0902",
              borderRadius: "3",
            },
          ],
        }
      )
      calculateTotalViewCategories(resGetCategoriesViewStatistics?.data)
    }
    setLoadingCategoryMostWatchChart(false)
  }

  const calculateTotalViewCategories = async (data) => {
    let totalView = 0
    totalView = data.map((item) => (item.totalView))
    .reduce((total, totalView) => total + totalView, 0);
    setTotalView(totalView);
  }

  useEffect(() => {
    loadCategoriesViewStatistics()
  }, [])

  return (
    <div className="category__most__watch__chart">
      <BarChart
        name={"Lượt xem theo thể loại"}
        totalRenuve={`Tổng lượt xem: ${totalView}`}
        data={dataChart}
        options={options}
      />
    </div>
  )
}

export default CategoryMostWatchChart