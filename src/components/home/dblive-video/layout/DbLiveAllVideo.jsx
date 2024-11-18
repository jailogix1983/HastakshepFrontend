import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../../utils";
import { useRouter } from "next/router";
import { extractAltVideo } from "../../../../utils";

const DbLiveAllVideo = ({ dbvideos, setActiveVideo }) => {
  const router = useRouter();

  return (
    <>
      {dbvideos.map((video, index) => (
        <div
          className={`media post-block post-block__small`}
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
            router.replace({
              query: { ...router.query, title: `${video.title}` },
            });
          }}
        >
          <a className="align-self-center">
            <Image
              src={video.image}
              alt={extractAltVideo(video.image)}
              title={video.title}
              width={120}
              height={120}
              loading="lazy"
            />
            <span className="video-play-btn video-play-btn__small" />
          </a>

          <div className="media-body" style={{ margin: "auto" }}>
            <div className="post-cat-group">
              <a className="post-cat bg-color-blue-one">{video.channelTitle}</a>
            </div>
            <h3 className="axil-post-title hover-line hover-line">
              <a style={{ color: "Black" }}>{video.title}</a>
            </h3>
            <div className="post-metas">
              <ul className="list-inline">
                <li>
                  <span>
                    <i className="fa fa-edit" style={{ color: "#006EE5" }}></i>
                    By
                  </span>
                  <a className="post-author">
                    {video?.channelTitle || "Hastakshep"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DbLiveAllVideo;