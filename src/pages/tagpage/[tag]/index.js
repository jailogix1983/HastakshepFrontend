import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostSkeleton from "../../../components/skeleton/PostSkeleton";
import { getALLStorybyTags } from "../../../api/tagApi";
import NewsCard from "../../../components/common/NewsCard";
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
import CustomPagination from "../../../components/pagination/CustomPagination";
import ReactHtmlParser from "react-html-parser";

export default function TagDetails() {
  const router = useRouter();
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;

  const [tagDetails, setTagDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  useEffect(() => {
    const Load = async () => {
      if (!router.query.tag) {
        return;
      }

      setIsLoading(true);

      try {
        const tag = router.query.tag.replace(/-/g, " ");
        const data = await getALLStorybyTags({
          Tag: tag,
          RecordCount: limit,
          PageIndex: currentPage,
        });

        setTagDetails(data);
        setTotalCount(data[0]?.totalCount || 0);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    Load();
  }, [router.query.tag, currentPage]);

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

  return (
    <>
      <Header />
      {tagDetails.length > 0 && (
        <Breadcrumb bCat="TagPage" aPage={tagDetails[0]?.tags} />
      )}

      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div
              className="media  m-b-xs-30 col-md-8 col-sm-12"
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                padding: "10px",
              }}
            >
              <span>
                <img
                  className="mb-5"
                  src={`${ImagePathLocal}/${tagDetails[0]?.storyImage1 || tagDetails[0]?.storyImageThumb}`}
                  alt={tagDetails[0]?.storyImage1 || tagDetails[0]?.storyImageThumb}
                  style={{ width: "auto", height: "auto" }}
                  onError={(e) => {
                    const imgElement = e.target;
                    imgElement.src = "/images/DefaultImageHastakshep.webp";
                  }}
                  loading="lazy"
                />

                <p
                  className="hover-line"
                  style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                >
                  {tagDetails[0]?.description ? ReactHtmlParser(tagDetails[0]?.description) : (tagDetails[0]?.storyHeading || "")}
                </p>
              </span>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="media-body">
                <WidgetPost dataPost={[]} />
                <AdSenseEndOfArticle />
                <br />
                <AdSenseSidebar2 />
              </div>
            </div>
          </div>
          <div className="row">
            <CustomPagination
              dataLength={totalCount}
              limit={limit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              searchValues={""}
            />
            <div className="col-lg-8">
              {tagDetails.length === 0 && <h5>No data found!</h5>}
              {tagDetails &&
                tagDetails.length > 0 &&
                tagDetails.slice(0, 10).map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <NewsCard data={data} />
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