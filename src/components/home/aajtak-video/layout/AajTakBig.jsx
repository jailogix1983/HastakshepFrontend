import React from "react";

const AajTakBig = ({ aajtakvideo }) => {
  if (!aajtakvideo) {
    return <div>No video data available.</div>;
  }
  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const generateEmbedUrl = (youtubeUrl) => {
    const videoId = extractVideoId(youtubeUrl);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return youtubeUrl;
  };

  const embedUrl = generateEmbedUrl(aajtakvideo.youtubeUrl);

  return (
    <div className="video-container">
      <iframe
        width="100%"
        height="400"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default AajTakBig;
