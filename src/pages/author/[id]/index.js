import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostSkeleton from "../../../components/skeleton/PostSkeleton";
import { getAuthorDetails } from "../../../api/getAuthorDetails";
import NewsCard from "../../../components/common/NewsCard";
import Header from "../../../components/header/Header";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Image from "next/image";
import AdSenseSidebar from "../../../components/common/AdSenseSidebar";
import AdSenseSidebar2 from "../../../components/common/AdSenseSidebar2";
import AdSenseEndOfArticle from "../../../components/common/AdSenseEndOfArticle ";
import WidgetNewsletter from "../../../components/widget/WidgetNewsletter";
import WidgetInstagram from "../../../components/widget/WidgetInstagram";
import WidgetSocialShare from "../../../components/widget/WidgetSocialShare";
import Footer from "../../../components/footer/Footer";
import ShareUs from "../../../components/common/ShareUs";
import FeaturedImageAd from "../../../components/common/FeaturedImageAd";
import WidgetSocialShare1 from "../../../components/widget/WidgetSocialShare1";
import WidgetCategory from "../../../components/widget/WidgetCategory";
import WidgetPost from "../../../components/widget/WidgetPost";
import CustomPagination from "../../../components/pagination/CustomPagination";
import ReactHtmlParser from "react-html-parser";
import { formatAltString } from "../../../utils";
import AuthorCard from "../../../components/common/AuthorCard";

export default function AuthorDetails() {
  const router = useRouter();
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH_Author;

  const [authorDetails, setAuthorDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  useEffect(() => {
    async function Load() {
      setIsLoading(true);       
      try {
          const data = await getAuthorDetails({
            AuthorName: router.query.id,
            RecordCount: limit,
            PageIndex: currentPage,
          });          
            //const data = await getAuthorDetails(router.query.id);
            setAuthorDetails(data);
            setTotalCount(data[0].totalCount);
            setIsLoading(false);
        
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    Load();
  }, [router.query.id, currentPage, limit]);

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
      <Breadcrumb bCat="Author" aPage={authorDetails[0]?.author} />

      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>About the Author: {authorDetails[0]?.author}</h4>
            </div>
            <div
              className="media  m-b-xs-30 col-md-8 col-sm-12 aut-pic"
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                padding: "10px",
              }}
            >
              <span>
                {/* image */}

                <img src={`${ImagePathLocal}/${authorDetails[0]?.author_image}`}
                  alt={`Hastakshep.com-${formatAltString(authorDetails[0]?.englishurl, authorDetails[0]?.keywords)}`}
                  onError={(e) => {
                    const imgElement = e.target;
                    imgElement.src = "/images/DefaultImageHastakshep.webp"; // Replace with the path to your error image
                  }}
                  // loading = "lazy"
                />
                <noscript />
                <br></br>
                <br></br>
                <br></br>
                <p
                  className="hover-line"
                  style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                >
                  {authorDetails[0]?.description ?
                    ReactHtmlParser(authorDetails[0]?.description) :
                    (authorDetails[0]?.storyHeading || "")}
                </p>
              </span>
            </div>
            <div className="col-md-4 col-sm-12 m-t-md-10">
              <div className="media-body">
                {/* <div className="post-cat-group">
                  <span
                    className="post-cat cat-btn bg-color-blue-one"
                    style={{ cursor: "pointer" }}
                  >
                    About: {authorDetails[0]?.author || "author"}
                  </span>
                </div> */}


                {/* <div className="post-metas" style={{ marginBottom: "1rem" }}>
                  <ul className="list-inline">
                    <li>
                      <span style={{ marginTop: "20px", fontSize: "1.8rem" }}>
                        <i
                          className="fa fa-user"
                          style={{ color: "rgb(0, 110, 229)" }}
                        />{" "}
                        {authorDetails[0]?.author}
                      </span>
                    </li>
                  </ul>
                </div> */}
                {/* <ShareUs shareurl={`${authorDetails[0]?.redirectURL}`} /> */}
                {/* <ShareUs shareurl={`https://hastakshep.com/${authorDetails[0]?.redirectURL.replace("\\", "/")}`} /> */}
                <WidgetPost dataPost={[]} />
                <AdSenseEndOfArticle />
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
              {authorDetails.length === 0 && <h5>No data found!</h5>}
              {authorDetails &&
                authorDetails.length > 0 &&
                authorDetails.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <AuthorCard data={data}/>
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
