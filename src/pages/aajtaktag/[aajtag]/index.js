import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostSkeleton from "../../../components/skeleton/PostSkeleton";
import { getALLAajtakbyTags } from "../../../api/aajTakApi";
import Header from "../../../components/header/Header";
import Breadcrumb from "../../../components/common/Breadcrumb";
import AdSenseSidebar from "../../../components/common/AdSenseSidebar";
import AdSenseSidebar2 from "../../../components/common/AdSenseSidebar2";
import AdSenseEndOfArticle from "../../../components/common/AdSenseEndOfArticle ";
import WidgetNewsletter from "../../../components/widget/WidgetNewsletter";
import WidgetInstagram from "../../../components/widget/WidgetInstagram";
import Footer from "../../../components/footer/Footer";
import ShareUs from "../../../components/common/ShareUs";
import FeaturedImageAd from "../../../components/common/FeaturedImageAd";
import WidgetSocialShare1 from "./../../../components/widget/WidgetSocialShare1";
import WidgetCategory from "../../../components/widget/WidgetCategory";
import WidgetPost from "../../../components/widget/WidgetPost";
import Link from "next/link";

export default function AajTakTagDetails() {
  const router = useRouter();

  //   const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;

  const [aajtagDetails, setAajTagDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const aajtag = router.query.aajtag?.replace(/-/g, " ") || "";

  useEffect(() => {
    async function Load() {
      setIsLoading(true);

      try {
        const data = await getALLAajtakbyTags(aajtag);
        setAajTagDetails(data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    Load();
  }, [router.query.tag]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <PostSkeleton limit={5} />
          </div>
        </div>
      </div>
    );
  }

  const generateEmbedUrl = (youtubeUrl) => {
    const videoId = extractVideoId(youtubeUrl);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return youtubeUrl;
  };
  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <>
      <Header />
      <Breadcrumb bCat="TagPage" aPage={aajtagDetails[0]?.tags} />

      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {aajtagDetails.length === 0 && <h5>No data found!</h5>}
              {aajtagDetails.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`media post-block m-b-xs-30`}
                      style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        padding: "10px",
                      }}
                    >
                      <span className="align-self-center">
                        <a
                          href={`${data?.youtubeUrl}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <iframe
                            width="250px"
                            height={250}
                            src={generateEmbedUrl(data.youtubeUrl)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </a>
                      </span>

                      <div className="media-body">
                        <h3
                          className="axil-post-title hover-line hover-line"
                          style={{ marginBottom: "0", cursor: "pointer" }}
                        >
                          <Link href={data?.youtubeUrl} passHref>
                            <a target="_blank" rel="noreferrer">
                              {data?.heading || data?.heading}
                            </a>
                          </Link>
                        </h3>
                        <div
                          className="post-metas"
                          style={{ marginBottom: "1rem" }}
                        >
                          <ul className="list-inline"></ul>
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
                );
              })}
              <WidgetInstagram />
              <FeaturedImageAd />
            </div>

            <div className="col-lg-4">
              <div className="post-sidebar">
                <AdSenseSidebar />
                <WidgetNewsletter />
                <WidgetCategory cateData={[]} />
                <WidgetPost dataPost={[]} />
                <WidgetSocialShare1 />
                <AdSenseSidebar2 />
                <AdSenseEndOfArticle />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
