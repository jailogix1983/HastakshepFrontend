import React, { useEffect, useState } from "react";
import PostSkeleton from "../../../skeleton/PostSkeleton";
import NewsCard from "../../../common/NewsCard";
import { getCategoryByData } from "../../../../api/categoryByNews";

const PramukhSamacharNews = () => {
  const [aapkinazar, setaapkinazar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getCategoryByData("aapki najar");

        if (!ignore) {
          setaapkinazar(data);
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

  if (aapkinazar.length === 0) {
    return <h5>No data found!</h5>;
  }

  return (
    <>
      {aapkinazar?.slice(0, 10).map((data, index) => {
        return (
          <React.Fragment key={index}>
            <NewsCard data={data} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default PramukhSamacharNews;
