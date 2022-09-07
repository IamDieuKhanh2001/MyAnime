import React from "react";
import ReactPlayer from "react-player";
import "./Film.scss";

export default function Film({ episodeWatching }) {
  const videoSrc = episodeWatching.resource
  // "https://res.cloudinary.com/dpxgtmzld/video/upload/v1661585857/MyAnimeProject_TLCN/test/video1.mp4";
  const playerRef = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);

  const onReady = React.useCallback(() => {
    if (!isReady) {
      const timeToStart = 20;
      playerRef.current.seekTo(timeToStart, "seconds");
      setIsReady(true);
    }
  }, [isReady]);
  const onEnd = React.useCallback(() => {
    console.log("Ended");
  });
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
      />
    </div>
  );
}
