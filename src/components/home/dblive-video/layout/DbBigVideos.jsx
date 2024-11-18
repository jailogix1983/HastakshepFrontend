const DbBigVideos = ({ dbvideo }) => {
  let modifiedVideoLink = `https://www.youtube.com/embed/${dbvideo.videoId}`;
  // let title = `${video.title}`
  if (modifiedVideoLink.includes("youtube.com")) {
    modifiedVideoLink = modifiedVideoLink.includes("?")
      ? `${modifiedVideoLink}&rel=0`
      : `${modifiedVideoLink}?rel=0`;
  }

  return (
    <>
      <div className="axil-img-container ">
        <iframe
          width="100%"
          height={400}
          src={modifiedVideoLink}
          title={dbvideo.image}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
};

export default DbBigVideos;
