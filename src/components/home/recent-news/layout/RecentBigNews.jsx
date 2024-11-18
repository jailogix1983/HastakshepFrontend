import { useEffect, useState } from "react";
import Link from "next/link";
import { slugify } from "../../../../utils";
import { getRecentBigNews } from "../../../../api/recentNews";
import { formatAltString } from "../../../../utils";

const RecentBigNews = () => {
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;
  const [recentBigNews, setRecentBigNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getRecentBigNews();
        if (!ignore) {
          setRecentBigNews(data);
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

  return (
    <>
      <div className="axil-latest-post">
        <div className="media post-block m-b-xs-20">
          {isLoading && (
            <img
              src="/images/DefaultImageHastakshep.webp"
              className="BigStories"
              alt="DefaultImageHastakshep"
            />
          )}

          {recentBigNews.map((data) => {
            return (
              <div key={data.storyID} className="recent-big-news-item">
                <figure className="fig-container">
                  <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
                    <span
                      style={{
                        boxShadow:
                          "0 0 2px 0 rgba(0, 0, 0, .25) inset, 0 5px 10px 5px rgba(0, 0, 0, .20)",
                        border: "solid 0.6vmin #eee",
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        src={`${ImagePathLocal}/${data?.storyimage1}`}
                        alt={`Hastakshep.com-${formatAltString(
                          data?.category_name,
                          data?.keywords
                        )}`}
                        onError={(e) => {
                          const imgElement = e.target;
                          imgElement.src = '/images/DefaultImageHastakshep.webp';
                        }}
                        className="BigStories"
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        style={{ objectFit: "fill", cursor: "pointer" }}
                      />
                    </span>
                  </Link>
                  <div className="post-cat-group m-b-xs-10">
                    <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
                      <a
                        className={`post-cat cat-btn ${data?.cate_bg ?? "bg-color-blue-one"
                          }`}
                      >
                        {data.english_url || "बड़ी ख़बरें"}
                      </a>
                    </Link>
                  </div>
                </figure>
                <div className="media-body">
                  <h3 className="axil-post-title hover-line hover-line">
                    <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
                      {data.storyheading}
                    </Link>
                  </h3>
                  <div className="post-metadata">
                    <ul className="horizontal-list">
                      <li>
                        <i
                          className="fa fa-edit"
                          style={{ color: "#006EE5" }}
                        ></i>{" "}
                        By{" "}
                        <Link href={`/author/${data?.author}`}>
                          {data?.author.replace("-", " ") || "Hastakshep"}
                        </Link>
                      </li>
                      <li>
                        <i className="dot">.</i>
                        {data.daysago}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
     
    </>
  );
};

export default RecentBigNews;
