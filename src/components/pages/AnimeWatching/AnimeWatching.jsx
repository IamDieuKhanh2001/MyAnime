import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { APIGetEpisodeBySeriesId } from "../../../api/axios/episodeAPI";
import { episodeActions } from "../../../api/redux/slices/episodeSlice";
import BreadcrumbOption from "../../global/BreadcrumbOption/BreadcrumbOption";
import Footer from "../../global/Footer/Footer";
import Header from "../../global/Header/Header";
import LoadingAnimation from "../../global/LoadingAnimation/LoadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import "./AnimeWatching.scss";
import Film from "./Film/Film";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import AnimeReview from "../../global/AnimeReview/AnimeReview";
import { Alert, AlertTitle } from "@mui/material";
import ProductDetailSideBar from "../../global/Product/ProductDetailSideBar/ProductDetailSideBar";
import { APIGetCommentByEpisodeId } from "../../../api/axios/commentAPI";
import { commentActions } from "../../../api/redux/slices/commentSlice";
import { axiosClient } from "../../../api/axios/axiosClient";
import { useTranslation } from "react-i18next";

export default function AnimeWatching() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { seriesId } = useParams();
  const [searchParams] = useSearchParams();

  let episodeId = searchParams.get('episodeId');
  let lastSecondExit = searchParams.get('second')
  if (lastSecondExit === null) {
    lastSecondExit = 0
  }
  let epCurrent = {};

  const [episodeIdWatching, setEpisodeIdWatching] = useState(episodeId);

  const [episodeLoading, setEpisodeLoading] = useState(true)

  const episodeList = useSelector((state) => state.episodes.list);

  const loadEpisode = async () => {
    setEpisodeLoading(true)
    console.log("Calling api get Episode");
    const resGetEpisode = await APIGetEpisodeBySeriesId(seriesId);
    if (resGetEpisode?.status === 200) {
      const updateEpisodeListAction = episodeActions.updateList(resGetEpisode.data);
      dispatch(updateEpisodeListAction);
    }
    setEpisodeLoading(false)
  };
  const getCurrentWatchingEpisode = () => {
    epCurrent = episodeList.find(episode => episode.id === parseFloat(episodeIdWatching))
    if (epCurrent === undefined) {
      epCurrent = episodeList[0]
    }
    return epCurrent
  }

  useEffect(() => {
    loadEpisode();
    setEpisodeIdWatching(searchParams.get('episodeId'))
  }, []);

  const getCurrentPathWithoutLastPart = () => {
    return location.pathname.slice(0, location.pathname.lastIndexOf('/')) + "/" + seriesId
  }

  return (
    <div className="animeWatching">
      <Header />
      <BreadcrumbOption cateList={location.state?.product.categoryList} seriesName={location.state?.product.seriesName} />
      <div className="anime-details spad">
        <div className="container">
          <div className="row">
            {episodeLoading ? (<LoadingAnimation />) : (
              <React.Fragment>
                <div className="col-lg-12">
                  <div className="anime__video__player">
                    {episodeList.length !== 0 &&
                      <Film episodeWatching={getCurrentWatchingEpisode()} lastSecondExit={lastSecondExit} episodeIdWatching={episodeIdWatching} setEpisodeIdWatching={setEpisodeIdWatching} />
                    }
                  </div>
                  <div className="anime__details__episodes">
                    <div className="section-title">
                      <h5>
                        {t("anime_watching.section_episode_title")}
                      </h5>
                    </div>
                    {episodeList.length === 0 &&
                      (<Alert severity="info">
                        <AlertTitle><strong>Đang cập nhật ...</strong></AlertTitle>
                        Series này hiện đang cập nhật, Bạn quay lại sau nhé !!
                      </Alert>)
                    }
                    {
                      episodeList.map((episode, index) => (
                        <a className={episode.id === getCurrentWatchingEpisode().id ? "episode__active" : ""} href={getCurrentPathWithoutLastPart() + `?episodeId=${episode.id}`} key={index}>
                          {t("anime_watching.episode_num_prefix")}
                          {episode.title}
                        </a>
                      ))
                    }
                  </div>
                </div>
              </React.Fragment>
            )}

          </div>
          <div className="row">
            <div className="col-lg-8 col-md-8">
              {episodeLoading === false &&
                (<AnimeReview episodeIdWatching={episodeIdWatching} episodeWatching={getCurrentWatchingEpisode()} />)}

            </div>
            <div className="col-lg-4 col-md-4">
              <ProductDetailSideBar />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
