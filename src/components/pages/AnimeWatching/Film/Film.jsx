import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { APIHistoriesSeriesUserLoggingSave } from "../../../../api/axios/historyWatchingAPI";
import { HistoryActions } from "../../../../api/redux/slices/HistoryWatchingSlice";
import "./Film.scss";

export default function Film({ episodeWatching, lastSecondExit }) {
  // const dispatch = useDispatch();
  // const historyList = useSelector((state) => state.histories.list);

  const videoSrc = episodeWatching.resource
  // "https://res.cloudinary.com/dpxgtmzld/video/upload/v1661585857/MyAnimeProject_TLCN/test/video1.mp4";
  const playerRef = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [played, setPlayed] = useState(0);

  const saveUserLoggingHistory = async () => {
    console.log("Calling api save history series");
    const resHistorySave = await APIHistoriesSeriesUserLoggingSave(played, episodeWatching.id);
  };

  const onPause = () => {
    saveUserLoggingHistory()
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
  });
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
        volume={0}
        light="/videos/anime-watch.jpg"
        onReady={onReady}
        onEnded={onEnd}
        onProgress={onProgress}
        // onPause={() => {
        //   console.log("On pause")
        //   console.log(secondPlayed)
        // }}
        onPause={onPause}
      />
    </div>
  );
}
