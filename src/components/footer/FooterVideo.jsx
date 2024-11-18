import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Link from "next/link";
import PostSkeleton from "../skeleton/PostSkeleton";
import getYouTubeVideos from "../../api/getYouTubeVideos";
import { extractAltVideo } from "../../utils";

const FooterVideo = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function Load() {
      try {
        const playlistID = process.env.NEXT_PUBLIC_VIDEO_SECTION_PLAYLIST_ID;
        const data = await getYouTubeVideos({ playlistID });
        const playlistItems = data.items;
        const videoData = playlistItems
          .filter(
            (item) =>
              item.snippet.title !== "Private video" &&
              item.snippet.title !== "Deleted video"
          )
          .map((item) => ({
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            image: item.snippet.thumbnails.medium.url,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
          }));
        setVideos(videoData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    Load();
  }, []);
  if (isLoading) {
    return <PostSkeleton limit={3} />;
  }

  if (videos.length === 0) {
    return <h3>No data!</h3>;
  }

  return (
    <>
      {videos &&
        videos.length > 0 &&
        videos.slice(4, 7).map((video, index) => {
          let modifiedVideoLink = `https://www.youtube.com/embed/${video.videoId}`;
          let title = `${video.title}`;
          let images = `${video.image}`;
          if (modifiedVideoLink.includes("youtube.com")) {
            modifiedVideoLink = modifiedVideoLink.includes("?")
              ? `${modifiedVideoLink}&rel=0`
              : `${modifiedVideoLink}?rel=0`;
          }

          return (
            <>
              <div
                className={`media post-block m-b-xs-30`}
                style={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: "6px",
                }}
              >
                <Link href={modifiedVideoLink}>
                  <a
                    className="align-self-center"
                    style={{ marginRight: "1rem" }}
                    target="_blank"
                  >
                    <Image
                      src={images}
                      alt={extractAltVideo(images)}
                      title={title}
                      width={90}
                      height={55}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                      style={{
                        transition:
                          "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        borderRadius: "5px",
                        display: "block",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <span className="video-play-btn video-play-btn__small" />
                  </a>
                </Link>
                <div className="media-body">
                  <h3
                    className="axil-post-title hover-line hover-line"
                    style={{
                      marginBottom: "0",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "normal",
                      padding: "0.5px",
                    }}
                  >
                    <Link href={modifiedVideoLink}>
                      <a target="_blank">{title}</a>
                    </Link>
                  </h3>
                </div>
              </div>
              <div style={{ marginTop: "-30px" }}>
                <hr
                  style={{
                    border: "none",
                    borderBottom: "1px dotted #000",
                    margin: "20px 0",
                  }}
                />
              </div>
            </>
          );
        })}
    </>
  );
};

export default FooterVideo;
