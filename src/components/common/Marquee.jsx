import React, { useEffect, useState } from "react";
import { getAllBreakingMarqueeData } from "../../api/getAllBreakingMarquee";

const Marquee = () => {
  const [marqueeData, setMarqueeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getAllBreakingMarqueeData();

        if (!ignore) {
          setMarqueeData(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    Load();

    return () => {
      ignore = true
    }
  }, []);

  return (
    <div className="marquee-rtl">
      <h5 className="marquheading">Breaking News</h5>
      {marqueeData.slice(0, 4).map((marqueedata, index) => {
        return <div
          key={index}>{marqueedata.storyHeading}</div>;
      })}
    </div>
  );
};

export default Marquee;
