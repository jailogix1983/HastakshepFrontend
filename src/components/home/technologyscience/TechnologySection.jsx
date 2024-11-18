import React, { useEffect, useState } from "react";
import SectionTitle from "../../common/SectionTitle";
import TechnologyScience from "./layout/TechnologyScience";
import { getCategoryByData } from "../../../api/categoryByNews";
import FileSeperator from "../../common/FileSeperator";

const TechnologySection = () => {
  // const ImagePath = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [technologyScience, settechnologyScience] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getCategoryByData("technology-and-science");
        if (!ignore) {
          settechnologyScience(data);
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
    return <h3>Loading...</h3>;
  }

  if (technologyScience.length === 0) {
    return <h3>No data found!</h3>;
  }

  return (
    <>
      <div
        className="section-gap section-gap-top__with-text top-stories bg-grey-light-three"
        style={{ marginTop: "-32px" }}
      >
        <div
          className="container"
          style={{ marginTop: "50px", padding: "20px" }}
        >
          <SectionTitle title="तकनीक व विज्ञान " btnText="" />
          <div className="row">
            {technologyScience.slice(0, 4).map((data, index) => {
              return (
                <div className="col-lg-3" key={index}>
                  <div className="axil-content">
                    <TechnologyScience data={data} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <FileSeperator /> */}
    </>
  );
};

export default TechnologySection;
