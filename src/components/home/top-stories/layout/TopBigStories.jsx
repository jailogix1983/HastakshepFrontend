import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { dateFormat, formatAltString, slugify } from "../../../../utils";
import { getTopStories } from "../../../../api/topstories";

import PostSkeleton from "../../../skeleton/PostSkeleton";

const TopBigStories = () => {
  const [topBigStories, settopBigStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;

  useEffect(() => {
    let ignore = false;
    async function Load() {
      try {
        const data = await getTopStories();
        if (!ignore) {
          settopBigStories(data);
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

  // if (isLoading) {
  //   return <PostSkeleton limit={3} />;
  // }

  // if (topBigStories.length === 0) {
  //   return <h5>No data found!</h5>;
  // }

  return (
    <>
    {isLoading && (
        <img
          src="/images/DefaultImageHastakshep.webp"
          alt="DefaultImageHastakshep"
          className="topBigStories"

        />
      )}
      {topBigStories.slice(8, 9).map((data, index) => {
        return (
          <React.Fragment key={index}>
            <div className="axil-img-container m-b-xs-30">
              <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
                <a className={`d-block h-100`}>
                  <img
                    src={`${ImagePathLocal}/${data?.storyImage1 || data?.storyImageThumb}`}
                    alt={`Hastakshep.com-${formatAltString(data?.category_name, data?.keywords)}`}
                    onError={(e) => {
                      const imgElement = e.target;
                      imgElement.src = "/images/DefaultImageHastakshep.webp"; // Replace with the path to your error image
                    }}
                    style={{objectFit:"fill"}}
                    className="w-100 topBigStories"
                    loading = "lazy"
                  />
                  <div className={`grad-overlay `} />
                </a>
              </Link>
              <div
                className="post-cat-group"
                style={{ position: "absolute", top: "10px", left: "10px" }}
              >
                <Link href={`/category/${slugify(data?.cate || "")}`}>
                  <a className={`post-cat cat-btn btn-mid bg-color-blue-one `}>
                    {" "}
                    {data.englishurl || "NEWS"}
                  </a>
                </Link>
              </div>
              <div className="media post-block position-absolute">
                <div className={`media-body `}>
                  <div className="axil-media-bottom">
                    <h3 className="axil-post-title hover-line hover-line">
                      <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
                        <a>
                          {data.storyheading?.substring(0, 80) || ""}
                          {data.storyheading?.length > 80 && "..."}
                        </a>
                      </Link>
                    </h3>
                    <div className="post-metas">
                      <ul className="list-inline">
                        <div className="post-metas">
                          <ul className="list-inline">
                            <ul className="list-inline">
                              <li>
                                <span>
                                  <i
                                    className="fa fa-edit"
                                    style={{ color: "#006EE5" }}
                                  ></i>{" "}
                                  By{" "}
                                  <Link href={`/author/${data?.author}`}>
                                    {data?.author.replace("-"," ") || "Hastakshep"}
                                  </Link>
                                </span>
                              </li>
                              <li>.</li>
                              {data.daysago}
                            </ul>
                          </ul>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default TopBigStories;
