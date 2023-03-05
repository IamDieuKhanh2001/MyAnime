import React from "react";
import CategoryMostWatchChart from "./CategoryMostWatchChart/CategoryMostWatchChart";
import Chart from "./Chart/Chart";
import PremiumChart from "./PremiumChart/PremiumChart";
import RevenueChart from "./RevenueChart/RevenueChart";
import TopupPackageChart from "./TopupPackageChart/TopupPackageChart";
import ViewStatisticsChart from "./ViewStatisticsChart/ViewStatisticsChart";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-6">
          <ViewStatisticsChart />
        </div>
        <div className="col-6">
          <RevenueChart />
        </div>
        <div className="col-6">
          <CategoryMostWatchChart />
        </div>
        {/* <div class="col-6">
          <Chart />
        </div> */}
      </div>
      <div className="row">
        <div className="col-4">
          <PremiumChart />
        </div>
        \<div className="col-4">
          <TopupPackageChart />
        </div>
      </div>
    </div>
  );
}
