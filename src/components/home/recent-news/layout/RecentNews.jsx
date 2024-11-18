import React, { useEffect, useState } from "react";
import { getRecentNews } from "../../../../api/recentNews";
import PostSkeleton from "../../../skeleton/PostSkeleton";
import NewsCard from "../../../common/NewsCard";
import { Scrollbars } from "react-custom-scrollbars";

const RecentNews = () => {
  const [recentNews, setRecentNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getRecentNews();

        if (!ignore) {
          setRecentNews(data);
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
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        style={{ width: "100%", height: "475px" }}
        renderTrackVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              width: "6px",
              backgroundColor: "#333",
              borderRadius: "3px",
              right: "2px",
              bottom: "2px",
              top: "2px",
              position: "absolute",
            }}
          />
        )}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: "#666",
              borderRadius: "3px",
            }}
          />
        )}
      >
        <div className="scrollable-container">
          {isLoading && <PostSkeleton limit={3} />}
          {recentNews.length === 0 && <h5>No data found!</h5>}

          {recentNews.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <NewsCard data={item} />
              </React.Fragment>
            );
          })}
        </div>
      </Scrollbars>
    </>
  );
};

export default RecentNews;
