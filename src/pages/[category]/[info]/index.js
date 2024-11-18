import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/header/Header";
import Breadcrumb from "../../../components/common/Breadcrumb";
const AdBanner = dynamic(() => import("../../../components/common/AdBanner"), { ssr: false });
import PostSkeleton from "../../../components/skeleton/PostSkeleton";
import NewsCard from "../../../components/common/NewsCard";
import WidgetCategory from "../../../components/widget/WidgetCategory";
import WidgetPost from "../../../components/widget/WidgetPost";
import Footer from "../../../components/footer/Footer";
import HeadMeta from "../../../components/common/HeadMeta";
import { useGlobalState } from "../../../components/hooks/useGlobalState";
import { SELECTED_MAIN_MENU, SELECTED_SUB_MENU } from "../../../components/context/reducer";
const WidgetNewsletter = dynamic(() => import("../../../components/widget/WidgetNewsletter"), { ssr: false });
const WidgetInstagram = dynamic(() => import("../../../components/widget/WidgetInstagram"), { ssr: false });
import { getCategoryDataByEnglishURL } from "../../../api/GetDataByEnglisURL";
const AdSenseSidebar = dynamic(() => import("../../../components/common/AdSenseSidebar"), { ssr: false });
const AdSenseSidebar2 = dynamic(() => import("../../../components/common/AdSenseSidebar"), { ssr: false });
const AdSenseEndOfArticle = dynamic(() => import("../../../components/common/AdSenseEndOfArticle "), { ssr: false });
const AdSenseHead = dynamic(() => import("../../../components/common/AdSenseHead"), { ssr: false });
const WidgetSocialShare1 = dynamic(() => import("../../../components/widget/WidgetSocialShare1"), { ssr: false });
import CustomPagination from "../../../components/pagination/CustomPagination";
import { HomeSubcategorystoryimportantNews } from "../../../api/HomeSubcategorystoryimportantNews";
import { getJWTToken } from "../../../api/authToken";
import { GetStoryDetailsData } from "../../../api/GetStoryDetails";
import Index from "../../[category]/[info]/index";
import Head from "next/head";
import { dateFormat } from '../../../utils';
import BreadcrumbBanner from "../../../components/common/BreadcrumbBanner";


export default function InnerPage({ data }) {
  const router = useRouter();
  const [dataDetail, setDataDetail] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [storyDetailData, setStoryData] = useState([]);
  const { state, dispatch } = useGlobalState();
  const [isCategoryData, setIsCategoryData] = useState(false);
  const [isDetailData, setIsDetailData] = useState(false); // New state to track detail data availability

  useEffect(() => {
    // Function to refresh the page when the URL changes
    const handleRouteChange = () => {
      router.reload();
    };

    // Listen for changes in the URL
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup the event listener when the component is unmounted
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    async function loadData() {
      try {

        const currentUrl = `${router.asPath}`;
        const caturl = router.query?.info?.replace(/-/g, " ") || "";
        const modifiedUrl = caturl === "aapki najar" ? caturl : caturl.replace(/ /g, "-");
        // if (currentUrl.includes("?")) {
        debugger;
        if (caturl != undefined) {
          const data = await getCategoryDataByEnglishURL({
            category: modifiedUrl,
            RecordCount: limit,
            PageIndex: currentPage,
          });
          if (data === undefined || data.length == 0) {
            router.push(`/${encodeURIComponent(modifiedUrl)}`);
          }
          setCategoryData(data);
          setTotalCount(data[0].totalCount);
          setIsLoading(false);
          dispatch({
            type: SELECTED_MAIN_MENU,
            payload: router.query.category,
          });
          setIsCategoryData(true);

          //if (params.info.split("-").length < 2) {
          // return {
          //   redirect: {
          //     destination: `/${encodeURIComponent(modifiedUrl)}`,
          //     permanent: false, // Use `true` for a 301 redirect
          //   },
          // };
          debugger;

          // }

        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    loadData();
  }, [router.query.category, dispatch, currentPage, limit]);

  return (
    <>

      <HeadMeta metaTitle={router?.query?.category} />
      <Header />
      {isCategoryData ? (
        <>
          <Breadcrumb aPage={`${router?.query?.category} / ${router?.query?.info}`} />
          <BreadcrumbBanner pageTitle={`${router?.query?.category} / ${router?.query?.info}`} />
          {/* <div className="banner banner__default bg-grey-light-three">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="post-title-wrapper">
                    <h2 className="m-b-xs-0 axil-post-title hover-line text-capitalize">

                      {state.selectedMainMenu?.category_name}{state.selectedSubMenu?.subcategory_Name}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="random-posts section-gap">
            <div className="container">
              <div className="row">
                <AdSenseHead />
                <div className="col-lg-8">
                  <div className="col">
                    <CustomPagination
                      dataLength={totalCount}
                      limit={limit}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      searchValues={""}
                    />
                  </div>

                  <div className="axil-content">
                    {isLoading && <PostSkeleton limit={limit} />}
                    {!isLoading && categoryData.length === 0 && (
                      <h5>No data found!</h5>
                    )}
                    {categoryData.map((data, index) => (
                      <React.Fragment key={index}>
                        <NewsCard data={data} />
                      </React.Fragment>
                    ))}
                  </div>
                  <CustomPagination
                    dataLength={totalCount}
                    limit={limit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    searchValues={""}
                  />
                </div>
                <div className="col-lg-4">
                  <div className="post-sidebar">
                    <AdSenseSidebar />
                    <WidgetNewsletter />
                    <WidgetCategory cateData={[]} />
                    <WidgetPost dataPost={[]} />
                    <br />
                    <WidgetSocialShare1 />
                    <AdSenseSidebar2 />
                    <AdSenseSidebar />
                    <AdSenseEndOfArticle />

                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : isDetailData && dataDetail !== null && dataDetail != undefined ? (
        <>
          <Index setDataDetail={dataDetail} />
        </>)
        :
        // <div className="text-center">
        //   <div className="spinner-border" role="status">
        //     <span className="sr-only">Loading...</span>
        //   </div>
        // </div>
        <div className="loader-container">
          <div className="loader" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>

      }


    </>
  );
}

export const getServerSideProps = async ({ params, resolvedUrl }) => {
  let data = {}; // Initialize data variable



  try {
    if (params.category === "old") {
      return {
        redirect: {
          destination: `/${encodeURIComponent(params.info)}`,
          permanent: false, // Use `true` for a 301 redirect
        },
      };
    }

    if (params && params.info && typeof params.info === "string") {
      const segments = params.info.split("-");
      const lastOneSegment = segments[segments.length - 1];
      const lastTwoSegment = segments[segments.length - 2];
      let englishURL = "";

      // Function to check if a value is numeric
      const isNumeric = (value) => !isNaN(parseInt(value, 10));

      if (isNumeric(lastOneSegment) && isNumeric(lastTwoSegment)) {
        const trimmedParts = segments.slice(0, -2);
        englishURL = trimmedParts.join('-');
        return {
          redirect: {
            destination: `/${encodeURIComponent(englishURL)}`,
            permanent: false, // Use `true` for a 301 redirect
          },
        };
      }
      else {
        englishURL = params.category;
      }

      //englishURL = params.category;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetCompleteStory?storySubheading=${englishURL}`;
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Check if fetch was successful
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }

      data = await res.json();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    data = { error: 'Failed to fetch data' };
  }


  return { props: { data: data } };

};

