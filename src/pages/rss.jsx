import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdSenseSidebar from "../components/common/AdSenseSidebar";
import WidgetNewsletter from "../components/widget/WidgetNewsletter";
import WidgetCategory from "../components/widget/WidgetCategory";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetSocialShare1 from "../components/widget/WidgetSocialShare1";
import AdSenseSidebar2 from "../components/common/AdSenseSidebar2";
import AdSenseEndOfArticle from "../components/common/AdSenseEndOfArticle ";
import FeaturedImageAd from "../components/common/FeaturedImageAd";
import WidgetInstagram from "../components/widget/WidgetInstagram";
import Footer from "../components/footer/Footer";
import Breadcrumb from "../components/common/Breadcrumb";
import Header from "../components/header/Header";
import { getCategoriesRSS } from "../api/categoriesRSS";

export default function Rss() {
  const router = useRouter();
  //   const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;
  const [CategoryDetails, setCategoryDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15); // Items per page


  useEffect(() => {
    async function Load() {
      setIsLoading(true);

      try {
        const data = await getCategoriesRSS();
        setCategoryDetails(data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    Load();
  }, []);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    // router.push({
    //     pathname: router.pathname,
    //     query: { ...router.query, page: pageNumber }
    // });
  };

  // Calculate indexes for pagination
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = CategoryDetails.slice(indexOfFirstPost, indexOfLastPost);

  // Function to generate pagination numbers
  const getPageNumbers = () => {
    const pageCount = Math.ceil(CategoryDetails.length / perPage);
    const currentPageIndex = currentPage - 1;
    const numbers = [];
    const pageRangeDisplayed = 3; // Display 3 page numbers before and after current page

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= currentPageIndex - pageRangeDisplayed && i <= currentPageIndex + pageRangeDisplayed)) {
        numbers.push(i);
      }
    }

    return numbers;
  };


  return (
    <>
      <Header />
      <Breadcrumb aPage="rss" />

      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <nav className="banner__default">
              <ul className="pagination pagination-lg">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(1)}>First</button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage - 1)}>Pre</button>
                </li>
                {getPageNumbers().map((number, index) => (
                  <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(number)}>{number}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === Math.ceil(CategoryDetails.length / perPage) ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                </li>
                <li className={`page-item ${currentPage === Math.ceil(CategoryDetails.length / perPage) ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => paginate(Math.ceil(CategoryDetails.length / perPage))}>Last</button>
                </li>
              </ul>
            </nav>
            <div className="col-lg-8">
              {currentPosts.length === 0 && <h5>No data found!</h5>}
              <div className="row">
                {currentPosts.map((data, index) => (
                  <>
                    <div className="col-lg-6" key={index}>
                      <div className="media post-block m-b-xs-30" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", padding: "10px" }}>
                        <div className="media-body">
                          <h3 className="axil-post-title hover-line hover-line" style={{ marginBottom: "0", cursor: "pointer" }}>
                            <Link href={`/rss/${data.englishUrl.replace(/\s+/g, '-')}.xml`} passHref>
                              <a target="_blank" rel="noreferrer">{data?.category_name}</a>
                            </Link>
                          </h3>
                          <div className="post-metas" style={{ marginBottom: "1rem" }}>
                            <ul className="list-inline"></ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6" key={index}>
                      <div className="media post-block m-b-xs-30" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", padding: "10px" }}>
                        <div className="media-body">
                          <h3 className="axil-post-title hover-line hover-line" style={{ marginBottom: "0", cursor: "pointer" }}>
                            {/* <Link href={data?.englishurl} passHref> */}
                            <Link href={`/rss/${data.englishUrl.replace(/\s+/g, '-')}.xml`} passHref>
                              <a target="_blank" rel="noreferrer">
                                <img
                                  className="mb-5"
                                  src='/images/rss1.png'
                                  alt='/images/rss1.png'
                                  style={{ width: "auto", height: "auto" }}
                                  loading = "lazy"
                                />
                              </a>
                            </Link>
                          </h3>
                          <div className="post-metas" style={{ marginBottom: "1rem" }}>
                            <ul className="list-inline"></ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                ))}
              </div>

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
