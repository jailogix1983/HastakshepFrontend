import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRecentNews } from "../../api/recentNews";
import PostSkeleton from "../skeleton/PostSkeleton";
import { formatAltString } from "../../utils";

const FooterNewsCard = () => {
  const [footerRecentNews, setFooterRecentNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;
  useEffect(() => {
    async function Load() {
      try {
        const data = await getRecentNews();
        setFooterRecentNews(data);
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

  if (footerRecentNews.length === 0) {
    return <h5>No data found!</h5>;
  }

  return (
    <React.Fragment>
      {footerRecentNews.slice(0, 3).map((data, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={`media post-block m-b-xs-30`}
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                padding: "2px",
              }}
            >
              <Link href={`/${data.englishurl}`}>
                <span className="align-self-center">
                  <img
                    src={`${ImagePathLocal}/${data.storyImageThumb || data.storyImage1
                      }`}
                    alt={`Hastakshep.com-${formatAltString(data?.category_Name, data?.keywords)}`}
                    style={{
                      width: "90px",
                      height: "55",
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      // Adding transitions for smoother effects
                      borderRadius: "5px",
                      display: "block",
                    }}
                    onError={(e) => {
                      const imgElement = e.target;
                      imgElement.src = "/images/DefaultImageHastakshep.webp"; // Replace with the path to your error image
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    loading = "lazy"
                  />
                </span>
              </Link>
              <div className="media-body">
                <h3
                  className="axil-post-title hover-line hover-line"
                  style={{
                    marginBottom: "0",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "normal",
                  }}
                >
                  <Link href={`/${data.redirectURL.replace("\\", "/")}`}>
                    {data.storyheading || data.storyHeading}
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
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default FooterNewsCard;
