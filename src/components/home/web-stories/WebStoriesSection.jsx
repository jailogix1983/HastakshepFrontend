import React, { useEffect, useState } from "react";
import { GetWebStories } from "../../../api/WebStories";
import PostSkeleton from "../../skeleton/PostSkeleton";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatAltString } from "../../../utils";

const WebStoriesSection = () => {
  const [WebstoriesNews, setWebstoriesNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH_WEBSTORIES;

  useEffect(() => {
    async function Load() {
      try {
        const MainStoryID = 0;
        const data = await GetWebStories(MainStoryID);
        setWebstoriesNews(data);
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

  if (WebstoriesNews.length === 0) {
    return <h5>No data found!</h5>;
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default value for larger screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1040, // Adjust this value as needed
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 667, // Adjust this value as needed
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 300, // Adjust this value as needed
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className="section-gap section-gap-top__with-text top-stories bg-grey-light-three"
      style={{ marginTop: "-32px", backgroundColor: "#fff" }}
    >
      <div
        className="container"
        style={{
          marginTop: "50px",
          backgroundColor: "#1e1e1e",
          padding: "20px",
        }}
      >
        <h2 style={{ color: "#fff" }}>Web Stories</h2>
        <Slider {...settings}>
          {WebstoriesNews.map((data, index) => (
            <div className="col-lg-3" key={index}>
              <div className="axil-content">
                <div className={`axil-img-container m-b-xs-30`}>
                  <Link href={`/webstories/${data?.url.replace(/\//g, '-').replace(/\/\//g, '-')}?${data?.webStoryID}`}>
                    <a className={`d-block h-100`}>
                      <img
                        src={`${ImagePathLocal}/${data?.webStoryID}/${data?.image}`}
                        alt={`Hastakshep.com-${formatAltString(data?.category_Name, data?.keywords)}`}
                        style={{
                          width: "250px",
                          height: "300px",
                          objectFit: "fill",
                        }}
                        onError={(e) => {
                          const imgElement = e.target;
                          imgElement.src = "/images/DefaultImageHastakshep.webp"; // Replace with the path to your error image
                        }}
                        loading = "lazy"
                      />
                      <div className={`grad-overlay`} />
                    </a>
                  </Link>
                  <div className="media post-block position-absolute">
                    <div className={`media  -body`}>
                      <div className="axil-media-bottom">
                        <h3
                          className="axil-post-title hover-line hover-line"
                          style={{ margin: "auto" }}
                        >
                          {/* <Link
                            href={`/webstories/${data?.webStoryID}?${data?.url}`}
                          >
                            <a style={{ color: "white" }}>
                              {data.storyHeading.slice(0, 52)}
                            </a>
                          </Link> */}
                          <div className="media post-block position-absolute">
                            <div className={`media-body`}>
                              <div className="axil-media-bottom">
                                <h3 className="axil-post-title hover-line hover-line">
                                  <Link
                                    href={`/webstories/${data?.url.replace(/\//g, '-').replace(/\/\//g, '-')}?${data?.webStoryID}`}
                                  >
                                    <a>
                                      {data?.storyHeading?.substring(0, 52) ||
                                        ""}
                                      {data?.storyHeading?.length > 52 && "..."}
                                    </a>
                                  </Link>
                                </h3>
                              </div>
                            </div>
                          </div>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default WebStoriesSection;
