import React from "react";
import Image from "next/image";
import Link from "next/link";
import { extractAltVideo } from "../../../../utils";

const AllVideos = ({ videos, setActiveVideo }) => {
  return (
    <>
      {videos.slice(0, 10).map((video, index) => (
        <div
          className="media post-block post-block__small"
          style={{
            boxShadow:
              "rgb(103 103 103 / 16%) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          key={index}
          onClick={() => {
            setActiveVideo(video);
          }}
        >
          <Link href={`/video/${video.id}`}>
            <a className="align-self-center">
              <Image
                src={video.image}
                alt={extractAltVideo(video?.image)}
                title={video.title}
                width={100}
                height={100}
               
              />
              <span className="video-play-btn video-play-btn__small" />
            </a>
          </Link>

          <div className="media-body" style={{ margin: "auto" }}>
            <div className="post-cat-group">
              <Link href={`/channel/${video.channelId}`}>
                <a className="post-cat bg-color-blue-one">
                  {video.channelTitle}
                </a>
              </Link>
            </div>

            <h3 className="axil-post-title hover-line">
              <Link href={`/video/${video.id}`}>
                <a style={{ color: "white" }}>{video.title}</a>
              </Link>
            </h3>

            <div className="post-metas">
              <ul className="list-inline">
                <li>
                  <span>
                    <i className="fa fa-edit" style={{ color: "#006EE5" }}></i>
                    By
                  </span>
                  <Link href={`/channel/${video.channelId}`}>
                    <a className="post-author">
                      {video?.channelTitle || "Hastakshep"}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllVideos;
