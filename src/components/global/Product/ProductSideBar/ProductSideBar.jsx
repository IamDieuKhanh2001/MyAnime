import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APIGetSeriesCommentRecent } from "../../../../api/axios/commentAPI";
import { APIGetTopMovieSeriesViewInNumberOfDay } from "../../../../api/axios/productAPI";
import { productsActions } from "../../../../api/redux/slices/productSlice";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import ProductRecentCommentItem from "./ProductRecentCommentItem";
import ViewTabPanel from "./ViewTabPanel/ViewTabPanel";

export default function ProductSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loadingTopView, setLoadingTopView] = useState(false)
  const [loadingSeriesCommentRecentList, setLoadingSeriesCommentRecentList] = useState(false)

  const seriesCommentRecentList = useSelector((state) => state.products.seriesCommentRecentList);

  const loadTopMovieSeriesViewInDay = async () => {
    const resGetTopViewInDay = await APIGetTopMovieSeriesViewInNumberOfDay(1, 5);
    if (resGetTopViewInDay?.status === 200) {
      const updateTopViewInDayAction = productsActions.updateTopViewInDay(resGetTopViewInDay.data);
      dispatch(updateTopViewInDayAction);
    }
  }

  const loadTopMovieSeriesViewInWeek = async () => {
    const resGetTopViewInWeek = await APIGetTopMovieSeriesViewInNumberOfDay(7, 5);
    if (resGetTopViewInWeek?.status === 200) {
      const updateTopViewInWeekAction = productsActions.updateTopViewInWeek(resGetTopViewInWeek.data);
      dispatch(updateTopViewInWeekAction);
    }
  }

  const loadTopMovieSeriesViewInMonth = async () => {
    const resGetTopViewInMonth = await APIGetTopMovieSeriesViewInNumberOfDay(30, 5);
    if (resGetTopViewInMonth?.status === 200) {
      const updateTopViewInMonthAction = productsActions.updateTopViewInMonth(resGetTopViewInMonth.data);
      dispatch(updateTopViewInMonthAction);
    }
  }

  const loadTopMovieSeriesViewInYear = async () => {
    const resGetTopViewInYear = await APIGetTopMovieSeriesViewInNumberOfDay(30, 5);
    if (resGetTopViewInYear?.status === 200) {
      const updateTopViewInYearAction = productsActions.updateTopViewInYear(resGetTopViewInYear.data);
      dispatch(updateTopViewInYearAction);
    }
  }

  const loadTopViewProduct = async () => {
    console.log("Calling api get top view");
    setLoadingTopView(true)
    loadTopMovieSeriesViewInDay()
    loadTopMovieSeriesViewInWeek()
    loadTopMovieSeriesViewInMonth()
    loadTopMovieSeriesViewInYear()
    setLoadingTopView(false)
  };

  const loadSeriesCommentRecent = async () => {
    setLoadingSeriesCommentRecentList(true)
    const resSeries = await APIGetSeriesCommentRecent(5);
    console.log(resSeries)
    if (resSeries?.status === 200) {
      const updateSeries = productsActions.updateSeriesCommentRecentList(resSeries.data);
      dispatch(updateSeries);
    }
    setLoadingSeriesCommentRecentList(false)
  }

  useEffect(() => {
    loadTopViewProduct();
    loadSeriesCommentRecent();
  }, []);

  return (
    <div className="product__sidebar">
      <div className="product__sidebar__view">
        <div className="section-title">
          <h5>{t("home.side_bar.top_view_title")}</h5>
        </div>
        {loadingTopView ? (
          <LoadingAnimation />
        ) : (
          <ViewTabPanel />
        )}
      </div>
      <div className="product__sidebar__comment">
        <div className="section-title">
          <h5>{t("home.side_bar.current_comment_title")}</h5>
        </div>
        {loadingSeriesCommentRecentList ? (<LoadingAnimation />) : (
          <React.Fragment>
            {seriesCommentRecentList?.map((series) => (
              <ProductRecentCommentItem data={series} />
            ))}
          </React.Fragment>
        )}

      </div>
    </div>
  );
}
