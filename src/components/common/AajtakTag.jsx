import React, { useState, useEffect } from "react";
import { getTagsByAajtakID } from "../../api/aajTakApi";
import Link from "next/link";

const AajtakTag = ({ data }) => {
  const storyID = data[0].aajTakID;
  const [aajtakTagData, setAajtakTagData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function Load() {
      try {
        const data = await getTagsByAajtakID(storyID);
        // const data = await getTagsByStoryId("463308");
        setAajtakTagData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    Load();
  }, [storyID]);

  if (isLoading) {
    return <h4>Loading...</h4>;
  }


  return (
    <>
      {aajtakTagData.map((tagdata, index) => (
        <div key={index}>
          <Link href={`/aajtaktag/${tagdata?.tag.replace(/\s+/g, "-")}`}>
            <a>{tagdata.tag}</a>
          </Link>
        </div>
      ))}
    </>
  );
};

export default AajtakTag;
