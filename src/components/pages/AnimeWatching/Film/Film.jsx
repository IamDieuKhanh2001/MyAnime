import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { APIHistoriesSeriesUserLoggingSave } from "../../../../api/axios/historyWatchingAPI";
import "./Film.scss";

export default function Film({ episodeWatching, lastSecondExit, setEpisodeIdWatching }) {
  const loginJwt = window.sessionStorage.getItem("jwt");
  const navigate = useNavigate();
  const { seriesId } = useParams();

  const episodeList = useSelector((state) => state.episodes.list);
  console.log(episodeList)

  const videoSrc = episodeWatching.resource
  // "https://res.cloudinary.com/dpxgtmzld/video/upload/v1661585857/MyAnimeProject_TLCN/test/video1.mp4";
  const playerRef = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [played, setPlayed] = useState(0);

  const saveUserLoggingHistory = async (playedSecond, epId) => {
    console.log("Calling api save history series");
    const resHistorySave = await APIHistoriesSeriesUserLoggingSave(playedSecond, epId);
  };

  const onPause = () => {
    if (loginJwt !== null) {
      saveUserLoggingHistory(played, episodeWatching.id)
    }
  }

  const onReady = React.useCallback(() => { //Get to last second out in history
    if (!isReady) {
      const timeToStart = lastSecondExit;
      playerRef.current.seekTo(timeToStart, "seconds");
      setIsReady(true);
    }
  }, [isReady]);
  const onEnd = React.useCallback(() => {
    console.log("Ended");
    let indexCurrentEp = episodeList.findIndex(episode => episodeWatching.id === episode.id);
    let nextEp = episodeList[indexCurrentEp + 1]
    console.log(nextEp)
    if(nextEp !== undefined) {
      let params = `?episodeId=${nextEp.id}&second=0`;
      handleNavigate(`/watching/${seriesId}`, `${params}`)
      setEpisodeIdWatching(nextEp.id)
      saveUserLoggingHistory(0, nextEp.id)
    }
  });

  const handleNavigate = (urlPath, params) => {
    navigate(`${urlPath}${params}`)
  }
  const onProgress = React.useCallback((progress) => {
    setPlayed(progress.playedSeconds)
  });

  useEffect(() => {
    return () => {
      setIsPlaying(false)
    };
  }, [])
  return (
    <div className="film">
      <ReactPlayer
        ref={playerRef}
        playing={isPlaying}
        url={videoSrc}
        config={{ file: { attributes: { controlsList: 'nodownload' } } }} //disable download
        onContextMenu={e => e.preventDefault()} //disable right click on video
        controls={true}
        volume={1}
        light="/videos/anime-watch.jpg"
        onReady={onReady}
        onEnded={onEnd}
        onProgress={onProgress}
        onPause={onPause}
      />
    </div>
  );
}
