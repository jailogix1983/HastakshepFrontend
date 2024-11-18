import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatAltString, slugify } from "../../../../utils";
import { getTopStories } from "../../../../api/topstories";
import PostSkeleton from "../../../skeleton/PostSkeleton";

const TopStories = () => {
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;

  const [topStories, settopStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function Load() {
      try {
        const data = await getTopStories();
        if (!ignore) {
          settopStories(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    Load();
    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return <PostSkeleton limit={3} />;
  }

  if (topStories.length === 0) {
    return <h5>No data found!</h5>;
  }

  return (
    <>
      {topStories.slice(4, 6).map((data, index) => {
        return (
          <div key={index} className="axil-img-container m-b-xs-30">
            <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
              <a className="d-block h-100">
                <img
                  src={`${ImagePathLocal}/${data?.storyImage1 || data?.storyImageThumb}`}
                  alt={`Hastakshep.com-${formatAltString(data?.category_name, data?.keywords)}`}
                  style={{
                    width: "350px",
                    height: "255px",
                    objectFit: "fill",
                  }}
                  onError={(e) => {
                    const imgElement = e.target;
                    imgElement.src = "/images/DefaultImageHastakshep.webp";
                  }}
                  className="w-100"
                  loading="lazy"
                />
                <div className="grad-overlay" />
              </a>
            </Link>
            <div
              className="post-cat-group m-b-xs-10"
              style={{ position: "absolute", top: "10px", left: "10px" }}
            >
              <Link href={`/${data?.englishurl.replace(
                /\s+/g,
                "-"
              )}?${data?.englishurl}`}>
                <a className="post-cat cat-btn btn-mid bg-color-blue-one">
                  {data.category_name || "News"}
                </a>
              </Link>
            </div>
            <div className="media post-block position-absolute">
              <div className="media-body">
                <div className="axil-media-bottom">
                  <h3 className="axil-post-title hover-line">
                    <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
                      <a>{data.storyheading}</a>
                    </Link>
                  </h3>
                  <div className="post-metas">
                    <ul className="list-inline">
                      <li>
                        <span>
                          <i className="fa fa-edit" style={{ color: "#006EE5" }}></i> By{" "}
                          <Link href={`/author/${data?.author}`}>
                            {data?.author.replace(/-/g, " ") || "Hastakshep"}
                          </Link>
                        </span>
                      </li>
                      <li>.</li>
                      <li>{data.daysago}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopStories;
