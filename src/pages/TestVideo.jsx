import React from 'react'
import ReactPlayer from 'react-player'

function TestVideo() {
    let videoSrc = "https://res.cloudinary.com/dpxgtmzld/video/upload/v1661586067/MyAnimeProject_TLCN/test/video2.mp4"
    const playerRef = React.useRef();
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [isReady, setIsReady] = React.useState(false);

    const onReady = React.useCallback(() => {
        if (!isReady) {
          const timeToStart =  0;
          playerRef.current.seekTo(timeToStart, "seconds");
          setIsReady(true);
        }
      }, [isReady]);
    return (
        <div>
            <ReactPlayer
                ref={playerRef}
                playing={isPlaying}
                url={videoSrc}
                controls={true}
                volume={1}
                light="./videos/anime-watch.jpg"
                onReady={onReady}
            />
        </div>
    )
}

export default TestVideo
