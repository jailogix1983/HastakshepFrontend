import React, { useState } from 'react';

const BigVideos = ({ video }) => {
  const [loaded, setLoaded] = useState(false);

  if (!video || !video.videoId) {
    return <div>No video data available</div>;
  }

  const handlePlay = () => {
    setLoaded(true);
  };

  const modifiedVideoLink = `https://www.youtube.com/embed/${video.videoId}?rel=0&autoplay=1`;

  return (
    <div className="big-video" style={{ maxWidth: '750px', margin: '0 auto' }}>
      {!loaded && (
        <div className="video-placeholder" onClick={handlePlay} style={{ position: 'relative', cursor: 'pointer' }}>
          <img src={video.image} alt={video.title} style={{ width: '100%', height: 'auto' }}  loading="lazy"/>
          <span className="video-play-btn play-button" />
        </div>
      )}
      {loaded && (
        <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            title={video.title}
            width="100%"
            height="100%"
            src={modifiedVideoLink}
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            
          />
        </div>
      )}
    </div>
  );
};

export default BigVideos;
