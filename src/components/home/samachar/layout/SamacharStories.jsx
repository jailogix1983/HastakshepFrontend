import React, { useEffect, useState } from "react";
import PostSkeleton from "../../../skeleton/PostSkeleton";
import { getCategoryByData } from "../../../../api/categoryByNews";
import NewsCard from "../../../common/NewsCard";

export default function SamacharStories() {
  const [trendingNews, setTrendingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getCategoryByData("news-2");

        if (!ignore) {
          setTrendingNews(data);
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
    return (
      <>
        <div className="col-lg-6">
          <PostSkeleton limit={6} />
        </div>
      </>
    );
  }

  if (trendingNews.length === 0) {
    return <h5>No data found!</h5>;
  }

  return (
    <>
      {trendingNews.slice(0, 10).map((data, index) => (
        <React.Fragment key={index}>
          <div className="col-lg-6">
            <NewsCard data={data} />
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
