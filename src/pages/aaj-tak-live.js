import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/common/HeadMeta";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetInstagram from "../components/widget/WidgetInstagram";
import AdSenseSidebar from "../components/common/AdSenseSidebar";
import AdSenseSidebar2 from "../components/common/AdSenseSidebar2";
import PostSkeleton from "../components/skeleton/PostSkeleton";
import { getAllAajtaklive } from "../api/aajTakApi";
import AajTakBig from "../components/home/aajtak-video/layout/AajTakBig";
import AajTakAll from "../components/home/aajtak-video/layout/AajTakAll";
import ReactHtmlParser from "react-html-parser";
import AajtakTag from "../components/common/AajtakTag";

const AajTakLive = ({ allPosts }) => {
  const [aajTakDetails, setAajTakDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState({});

  useEffect(() => {
    async function Load() {
      setIsLoading(true);
      try {
        const data = await getAllAajtaklive();
        setActiveVideo(data[0]);
        setAajTakDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    Load();
  }, []);

  if (isLoading) {
    return (
      <section className="container">
        <div className="row">
          <div className="col-lg-6">
            <PostSkeleton limit={4} />
          </div>
          <div className="col-lg-6">
            <PostSkeleton limit={4} />
          </div>
        </div>
      </section>
    );
  }

  if (aajTakDetails.length === 0) {
    return <div>No data!</div>;
  }

  return (
    <>
      <HeadMeta metaTitle="Aaj Tak Live" />
      <Header />
      <Breadcrumb aPage="aaj-tak-live" />
      <BreadcrumbBanner pageTitle="Aaj Tak Live" />
      <div
        className="axil-video-posts section-gap section-gap-top__with-text bg-grey-dark-one"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h4>{aajTakDetails[0].keywords}</h4>
              <div className="title-left title-style04 underline04">
                <h4>{aajTakDetails[0].heading}</h4>
              </div>
              <AajTakBig aajtakvideo={activeVideo} />
              {aajTakDetails[0].description && (
                <div style={{ fontSize: "1.5rem" }}>
                  {ReactHtmlParser(aajTakDetails[0].description)}
                </div>
              )}
              <AajtakTag data={aajTakDetails} />
            </div>

            <div className="col-lg-4">
              <aside className="post-sidebar">
                <AdSenseSidebar />
                <WidgetNewsletter />
                <AdSenseSidebar2 />
                <WidgetPost dataPost={allPosts} />
                <WidgetInstagram />
              </aside>
            </div>
            {/* <div
              className="col-lg-4"
              style={{ maxHeight: "95vh", overflowY: "auto" }}
            >
              <AajTakAll
                aajTakDetails={aajTakDetails.slice(1)}
                setActiveVideo={setActiveVideo}
              />
            </div> */}
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          ></div>
        </div>

        {/* content section */}
      </div>

      <Footer />
    </>
  );
};

export default AajTakLive;
