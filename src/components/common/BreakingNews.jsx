import React, { useEffect, useState } from "react";
import { BindHomeBreakingNewsLiveUpdates } from "../../api/LiveNews";
import Link from "next/link";
import { useRouter } from "next/router";

const BreakingNews = () => {
  const router=useRouter();
  const [BreakingNewsData, setBreakingNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await BindHomeBreakingNewsLiveUpdates();

        if (!ignore) {
          setBreakingNewsData(data);
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

  // Function to handle closing the component
  const handleClose = () => {
    setIsVisible(false);
  };

  // Render the component only if isVisible state is true
  if (!isVisible) {
    return null; // If not visible, return null to render nothing
  }
  // Function to handle click and redirect to the story URL
  const handleClick = (redirectURL) => {
    router.push(redirectURL);
  }

  return (
    <div
      className="container"
      id="divBreakingNews"
      style={{ display: "block" }}
    >
      <div className="br-news">
        <div className="br-news-inner">
          <div className="br-news-head">
            <p className="m-0 text-white">Breaking News</p>
          </div>
          {/* Map over BreakingNewsData to display story headings */}
          <div className="br-news-txt">
            {BreakingNewsData?.slice(0, 1).map((story, index) => (
              <span
                key={index}
                id={`achBrakingNews${index}`}
                title={story.storySynopsis} // Assuming your API response contains a key named 'heading'
                onClick={() => handleClick(story.redirectURL)}
                style={{ cursor: 'pointer' }}
              >
                {story?.storySynopsis?.substring(0, 90)}
                {story?.storySynopsis?.length > 90 && "..."}
                {/* {story?.storysubheading?.substring(0, 90) || ""} */}
                {/* {story?.storysubheading?.length > 90 && "..."} */}
              </span>
            ))}
          </div>
        </div>
        <div className="br-news-close" onClick={handleClose} title="Close">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g data-name="Layer 57" id="Layer_57">
              <path
                d="M18.83,16l8.59-8.59a2,2,0,0,0-2.83-2.83L16,13.17,7.41,4.59A2,2,0,0,0,4.59,7.41L13.17,16,4.59,24.59a2,2,0,1,0,2.83,2.83L16,18.83l8.59,8.59a2,2,0,0,0,2.83-2.83Z"
                fill="#fff"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
