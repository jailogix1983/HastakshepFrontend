import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatAltString, slugify } from "../../utils";
import PostSkeleton from "../skeleton/PostSkeleton";
// import { getTopStories } from "../../api/topStories";
import { getTopStories } from "../../api/topstories";

const PopularWidgetPost = ({ data, pClass, videoIcon }) => {
  const [popularNews, setPopularNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTopStories();
        setPopularNews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return <PostSkeleton limit={3} />;
  }

  if (popularNews.length === 0) {
    return <h5>No data found!</h5>;
  }

  return (
    <>
      {popularNews.slice(0, 3).map((item, index) => (
        <div
          key={index}
          className={`media post-block post-block__small ${pClass ?? "post-block__on-dark-bg m-b-xs-30"
            }`}
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            padding: "10px",
          }}
        >
          <Link href={`/${item.englishurl}`}>
            <a className="align-self-center">
              <img
                src={`${ImagePathLocal}/${item.storyImageThumb || item.storyImage1}`}
                alt={`Hastakshep.com-${formatAltString(
                  item?.category_Name,
                  item?.keywords
                )}`}
                style={{
                  width: "100px",
                  height: "100px",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  borderRadius: "5px",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.src = "/images/DefaultImageHastakshep.webp";
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                loading="lazy"
              />
              {videoIcon === true ? <span className="video-play-btn video-play-btn__small" /> : ""}
            </a>
          </Link>

          <div className="media-body">
            <div className="post-cat-group">
              <Link href={`/${item?.englishurl}?${item?.englishurl}`}>
                <a className={`post-cat ${item.cate_bg ?? "bg-color-blue-one"}`}>
                  {item.category_name || "popular news"}
                </a>
              </Link>
            </div>
            <h3 className="axil-post-title hover-line">
              <Link href={`/${item.redirectURL.replace("\\", "/")}`}>
                <a>{item.storyheading || item.storyHeading}</a>
              </Link>
            </h3>
            <p className="hover-line" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              {item.storySynopsis?.substring(0, 52) || ""}
              {item.storySynopsis?.length > 52 && "..."}
            </p>
            <div className="post-metas">
              <ul className="list-inline">
                <li>
                  <span>
                    <i className="fa fa-edit" style={{ color: "#006EE5" }}></i> By{" "}
                    <Link href={`/author/${item?.author}`}>
                      {item?.author.replace("-", " ") || "Hastakshep"}
                    </Link>
                  </span>
                </li>
                <li>.</li>
                <li>{item.daysago}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PopularWidgetPost;
