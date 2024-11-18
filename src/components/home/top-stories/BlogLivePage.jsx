import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BindHomeBreakingNewsLiveUpdates } from "../../../api/LiveNews";
import { Scrollbars } from "react-custom-scrollbars";

const BlogLivePage = () => {
  const [BlogLivenews, setBlogLive] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formattedTimes, setFormattedTimes] = useState([]);

  useEffect(() => {
    const formattedTimesArray = BlogLivenews.map((item) =>
      formatTimeWithAMPM(item.storyDate)
    );
    setFormattedTimes(formattedTimesArray);
  }, [BlogLivenews]);

  const formatTimeWithAMPM = (dateTimeString) => {
    if (!dateTimeString || typeof dateTimeString !== "string") {
      return "";
    }

    const timePart = dateTimeString.split("T")[1];
    const [hour, minute] = timePart.split(":");

    let formattedTime;
    if (parseInt(hour, 10) < 12) {
      formattedTime = `${hour}:${minute} AM`;
    } else {
      formattedTime = `${parseInt(hour, 10) - 12}:${minute} PM`;
    }

    return formattedTime;
  };

  useEffect(() => {
    async function Load() {
      try {
        const data = await BindHomeBreakingNewsLiveUpdates();
        setBlogLive(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    Load();
  }, []);

  if (isLoading) {
    return <h5>Loading...</h5>; // Change this to a loading indicator as per your design
  }

  if (BlogLivenews.length === 0) {
    return <h5>No data found!</h5>;
  }

  return (
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
            position: "absolute"
          }}
        />
      )}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: "#666",
            borderRadius: "3px"
          }}
        />
      )}
    >
      <div className="scrollable-container">
        {BlogLivenews.map((data, index) => (
          <React.Fragment key={index}>
            <div
              className={`media post-block m-b-xs-30`}
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                padding: "10px",
              }}
            >
              <span className="align-self-center">
                <Link href={`${data?.redirectURL.replace("\\", "/")}`}  rel="noreferrer">
                  <span style={{ marginRight: "10px" }}>
                    <img
                      src="/images/Blogicon.png"
                      alt="separator"
                      style={{ width: "15px" }}
                      loading = "lazy"
                    />
                  </span>
                </Link>
              </span>

              <div className="media-body">
                <div className="post-cat-group">
                  <span
                    style={{ cursor: "pointer" }}
                    className={`post-cat cat-btn bg-color-blue-one`}
                  >
                    Live Blog
                  </span>
                </div>
                {/* <Link href={`${data?.redirectURL.replace("\\", "/")}`} passHref> */}
                <Link href={`${data?.redirectURL.replace("\\", "/")}`} >
                  <a  rel="noreferrer"
                    className="axil-post-title hover-line hover-line"
                    style={{ marginBottom: "0", cursor: "pointer" }}
                  >
                    {data?.storySynopsis?.substring(0, 70) || ""}
                    {data?.storysubheading?.substring(0, 70) || ""}

                    {data?.storySynopsis?.length > 70 && "..."}
                    {data?.storysubheading?.length > 70 && "..."}
                  </a>
                </Link>

                <div className="post-metas" style={{ marginBottom: "1rem" }}>
                  <ul className="list-inline">
                    <li style={{ color: "&#xf017" }}>
                      <i className="fas fa-clock"></i>
                      {data?.updatedDate} {formattedTimes[index]}
                    </li>
                  </ul>
                </div>
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
        ))}
      </div>
    </Scrollbars>
  );
};

export default BlogLivePage;
