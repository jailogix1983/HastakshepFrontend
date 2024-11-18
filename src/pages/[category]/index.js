import { useRouter } from "next/router";
import Breadcrumb from "../../components/common/Breadcrumb";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import WidgetNewsletter from "../../components/widget/WidgetNewsletter";
import ReactHtmlParser from "react-html-parser";
import SectionTitle from "../../components/common/SectionTitle";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import ShareUs from "../../components/common/ShareUs";
import AdSenseSidebar from "../../components/common/AdSenseSidebar";
import AdSenseSidebar2 from "../../components/common/AdSenseSidebar2";
import AdSenseEndOfArticle from "../../components/common/AdSenseEndOfArticle ";
import FeaturedImageAd from "../../components/common/FeaturedImageAd";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetCategory from "../../components/widget/WidgetCategory";
import WidgetSocialShare1 from "../../components/widget/WidgetSocialShare1";
import TagPage from "../../components/common/TagPage";
import { dateFormat, formatAltString } from "../../utils";
import AdSenseHead from "../../components/common/AdSenseHead";


// const SingleNewsInfo = ({ setDataDetail }) => {
  
  export default function SingleNewsInfo({ setDataDetail }) {
  const router = useRouter();
  var data=null;
   data = setDataDetail;
  // if (!data) {
  //   data = setDataDetail;
  // }
 console.log("data", data);
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;
  const altString = formatAltString(data?.catname, data?.keywords);
  const URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isTwitterLoaading, setIsTwitterLoading]= useState(true);

  useEffect(() => {
    if (data.type) {
      router.push(`/${data.redirectURL}`);
      // setIsLoading(true)
    }
    setIsLoading(false);
    const iframeTimeout = setTimeout(() => {
      setIsIframeLoading(false);
    }, 5000);

    setIsLoading(false);
    const iframeTwitter = setTimeout(() => {
      setIsTwitterLoading(false);
    }, 5000);

    return () => clearTimeout(iframeTimeout);
  }, []);





  // useEffect(() => {
  //   const loadTwitterScript = () => {
  //     if (window.twttr) {
  //       window.twttr.widgets.load();
  //     } else {
  //       const script = document.createElement("script");
  //       script.src = "https://platform.twitter.com/widgets.js";
  //       script.async = true;
  //       script.defer = true;
  //       script.charSet = "utf-8";
  //       document.body.appendChild(script);
  //     }
  //   };

  //   const timer = setTimeout(loadTwitterScript, 5000);
  //   return () => clearTimeout(timer);
  // }, [data]);

  // useEffect(() => {
  //   const loadTwitterScript = () => {
  //     if (window.twttr) {
  //       window.twttr.widgets.load();
  //     } else {
  //       const script = document.createElement("script");
  //       script.src = "https://platform.twitter.com/widgets.js";
  //       script.async = true;
  //       script.defer = true;
  //       script.charSet = "utf-8";
  //       document.body.appendChild(script);
  //     }
  //   };

  //   loadTwitterScript();
  // }, [data]);


  if (isLoading) {
    return (
      <>
  
        <Head>
          <title>{data.storyheading}</title>
          <meta name="description" content={data.storysynopsis} />{" "}
          <meta name="keywords" content={data.tags} /> <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="news_keywords" content={data.tags} />{" "}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="application-name" content="hastakshep.com" />{" "}
          <meta name="twitter:title" content={data.storyheading} />
          <meta name="twitter:url" content={`${URL}${data.canonicalUrl+"/"}`} />
          <meta
            name="twitter:image"
            content={`https://hastakshep.com${ImagePathLocal}/${data.storyimage1}`}
          />
          <meta name="twitter:site_name" content="@mediaamalendu" />
          <meta name="twitter:description" content={data.storysynopsis} />
          <meta name="twitter:site" content="@mediaamalendu" />
          <meta name="twitter:creator" content="@mediaamalendu" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="date" content={dateFormat(data.createdDate)} />
          <meta name="last-modified" content={dateFormat(data?.updatedDate)} />
          <meta
            name="og:site_name"
            content="https://www.hastakshep.com/"
          />{" "}
          <meta
            property="og:image"
            content={`https://hastakshep.com${ImagePathLocal}/${data.storyimage1}`}
          />{" "}
          <meta property="og:type" content="artical" />
          <meta property="og:description" content={data.storysynopsis} />{" "}
          <meta
            property="og:url"
            content={`${URL}${data.canonicalUrl+"/"?.replace("\\", "/")}`}
          />{" "}
          <link
            rel="canonical"
            href={`${URL}${data.canonicalUrl+"/"?.replace("\\", "/")}`}
            
          />{" "}
          <link
            rel="amphtml"
            href={`${URL}${data.redirectURL+"/"?.replace("\\", "/")}/amp/`}
          />{" "}
        </Head>
        <img
          src="/images/DefaultImageHastakshep.webp"
          className="Detailpage"
          alt="DefaultImageHastakshep"
          style={{ width: "500px", height: "500px" }}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && (
            <img
              src="/images/DefaultImageHastakshep.webp"
              className="BigStories"
              alt="DefaultImageHastakshep"
            />
            
          )}
          
     {data ? (
  <Head>
    <title>{data.storyheading}</title>
    <meta name="description" content={data.storysynopsis} />
    <meta name="keywords" content={data.tags} />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="news_keywords" content={data.tags} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="application-name" content="hastakshep.com" />
    <meta name="twitter:title" content={data.storyheading} />
    <meta name="twitter:url" content={`${URL}${data.canonicalUrl+"/"}`} />
    <meta
      name="twitter:image"
      content={`https://hastakshep.com${ImagePathLocal}/${data.storyimage1}`}
    />
    <meta name="twitter:site_name" content="@mediaamalendu" />
    <meta name="twitter:description" content={data.storysynopsis} />
    <meta name="twitter:site" content="@mediaamalendu" />
    <meta name="twitter:creator" content="@mediaamalendu" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="date" content={dateFormat(data.createdDate)} />
    <meta name="last-modified" content={dateFormat(data?.updatedDate)} />
    <meta
      property="og:site_name"
      content="https://www.hastakshep.com/"
    />
    <meta
      property="og:image"
      content={`https://hastakshep.com${ImagePathLocal}/${data.storyimage1}`}
    />
    <meta property="og:type" content="article" />
    <meta property="og:description" content={data.storysynopsis} />
    <meta
      property="og:url"
      content={`${URL}${data.canonicalUrl+"/"?.replace("\\", "/")}`}
    />
    <link
      rel="canonical"
      href={`${URL}${data.canonicalUrl+"/"?.replace("\\", "/")}`}
    />
    <link
      rel="amphtml"
      href={`${URL}${data.canonicalUrl+"/"?.replace("\\", "/")}/amp/`}
    />
  </Head>
) : (
  <div className="loader-container">
    <div className="loader" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)}

      <Header />
      <AdSenseHead />
      <Breadcrumb bCat={router.query.category} aPage={router.query.info} />
      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="post-metas" style={{ marginBottom: "1rem" }}>
                <h1>{data?.storyheading}</h1>
                <AdSenseHead />
                <ul className="list-inline">
                  <li>
                    <span>
                      <i
                        className="fa fa-user"
                        style={{ color: "#006EE5" }}
                      ></i>{" "}
                      <Link href={`/author/${data?.authorID}`} target="_blank" >
                        <b style={{ fontWeight: "600", cursor: "pointer" }}>
                          {data?.author || "Hastakshep"}
                        </b>
                      </Link>
                    </span>
                  </li>
                </ul>
                <ul className="list-inline">
                  <li>
                    <span>
                      <i
                        className="fa fa-calendar"
                        style={{ color: "#006EE5" }}
                      ></i>{" "}
                      Created Date:{data?.createdDate}
                    </span>
                  </li>
                </ul>
                {data?.updatedDate && (
                  <ul className="list-inline">
                    <li>
                      <span>
                        <i
                          className="fa fa-calendar"
                          style={{ color: "#006EE5" }}
                        ></i>{" "}
                        Updated Date:{data.updatedDate}
                      </span>
                    </li>
                  </ul>
                )}
              </div>

              <img
                src={`${ImagePathLocal}/${data.storyimage1}`}
                className="Detailpage"
                alt={`Hastakshep.com-${altString}`}
                onError={(e) => {
                  const imgElement = e.target;
                  imgElement.src = "/images/DefaultImageHastakshep.webp"; // Replace with the path to your error image
                }}
              />

              <FeaturedImageAd />

              <div className="my-5 detailfullstory">
                {data?.fullstory && (
                  <>

                    {ReactHtmlParser(
                      data.fullstory
                        .replace(/width="\d+"/g, 'width="740"')
                        .replace(/&gt;/g, ">")
                        .replace(/&lt;/g, "<")
                        .split(" ")
                        .slice(0, 300)
                        .join(" ")
                    )}
                    <AdSenseHead />


                    {ReactHtmlParser(
                      data?.fullstory
                        .replace(/width="\d+"/g, 'width="740"')
                        .replace(/&gt;/g, ">")
                        .replace(/&lt;/g, "<")
                        .split(" ")
                        .slice(300)
                        .join(" ")
                    )}

                    <div className="my-5 detailfullstory">
                      {isIframeLoading ? (
                        <></>
                      ) : (
                        data?.iframeContent &&
                        ReactHtmlParser(
                          data?.iframeContent
                            .replace(/width="\d+"/g, 'width="740"')
                            .replace(/&gt;/g, ">")
                            .replace(/&lt;/g, "<")
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
              <TagPage data={data} />

              <ShareUs data={data} />

              <AdSenseEndOfArticle />
              {data &&
                data.objrelatedstory &&
                data.objrelatedstory.length > 0 && (
                  <div
                    className="related-post p-b-xs-30"
                    style={{ marginTop: "50px" }}
                  >
                    <div className="container">
                      <SectionTitle title="Related Stories" />
                      <div className="grid-wrapper">
                        <div className="row">
                          {data.objrelatedstory[0] && (
                            <div className="col-lg-3 col-md-6">
                              <div className="content-block m-b-xs-30">
                                <Link
                                  href={`/${data.objrelatedstory[0].redirectURL.replace(
                                    "\\",
                                    "/"
                                  )}`}
                                  target="_blank" 
                                >
                                  <a>
                                    <img
                                      src={`${ImagePathLocal}/${data.objrelatedstory[0].storyImage1}`}
                                      alt={`Hastakshep.com-${formatAltString(
                                        data.category_Name,
                                        data.keywords
                                      )}`}
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                      }}
                                      onError={(e) => {
                                        e.target.src =
                                          "/images/DefaultImageHastakshep.webp";
                                      }}
                                      className="img-fluid"
                                    />
                                    <div className="grad-overlay" />
                                  </a>
                                </Link>
                                <div className="media-caption">
                                  <div className="caption-content">
                                    <h3 className="axil-post-title hover-line hover-line">
                                      <Link
                                        href={`/${data.objrelatedstory[0].redirectURL.replace(
                                          "\\",
                                          "/"
                                        )}`}
                                        target="_blank" 
                                      >
                                        {data.objrelatedstory[0].storyheading}
                                      </Link>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {data.objrelatedstory[1] && (
                            <div className="col-lg-3 col-md-6">
                              <div className="content-block m-b-xs-30">
                                <Link
                                  href={`/${data.objrelatedstory[1].redirectURL.replace(
                                    "\\",
                                    "/"
                                  )}`}
                                  target="_blank" 
                                >
                                  <a>
                                    <img
                                      src={`${ImagePathLocal}/${data.objrelatedstory[1].storyImage1}`}
                                      alt={`Hastakshep.com-${formatAltString(
                                        data.category_Name,
                                        data.keywords
                                      )}`}
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                      }}
                                      onError={(e) => {
                                        e.target.src =
                                          "/images/DefaultImageHastakshep.webp";
                                      }}
                                      className="img-fluid"
                                    />
                                    <div className="grad-overlay" />
                                  </a>
                                </Link>
                                <div className="media-caption">
                                  <div className="caption-content">
                                    <h3 className="axil-post-title hover-line hover-line">
                                      <Link
                                        href={`/${data.objrelatedstory[1].redirectURL.replace(
                                          "\\",
                                          "/"
                                        )}`}
                                        target="_blank" 
                                      >
                                        {data.objrelatedstory[1].storyheading}
                                      </Link>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {data.objrelatedstory[2] && (
                            <div className="col-lg-3 col-md-6">
                              <div className="content-block m-b-xs-30">
                                <Link
                                  href={`/${data.objrelatedstory[2].redirectURL.replace(
                                    "\\",
                                    "/"
                                  )}`}
                                  target="_blank" 
                                >
                                  <a>
                                    <img
                                      src={`${ImagePathLocal}/${data.objrelatedstory[2].storyImage1}`}
                                      alt={`Hastakshep.com-${formatAltString(
                                        data.category_Name,
                                        data.keywords
                                      )}`}
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                      }}
                                      onError={(e) => {
                                        e.target.src =
                                          "/images/DefaultImageHastakshep.webp";
                                      }}
                                      className="img-fluid"
                                    />
                                    <div className="grad-overlay" />
                                  </a>
                                </Link>
                                <div className="media-caption">
                                  <div className="caption-content">
                                    <h3 className="axil-post-title hover-line hover-line">
                                      <Link
                                        href={`/${data.objrelatedstory[2].redirectURL.replace(
                                          "\\",
                                          "/"
                                        )}`}
                                        target="_blank" 
                                      >
                                        {data.objrelatedstory[2].storyheading}
                                      </Link>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {data.objrelatedstory[3] && (
                            <div className="col-lg-3 col-md-6">
                              <div className="content-block m-b-xs-30">
                                <Link
                                  href={`/${data.objrelatedstory[3].redirectURL.replace(
                                    "\\",
                                    "/"
                                  )}`}
                                  target="_blank" 
                                >
                                  <a>
                                    <img
                                      src={`${ImagePathLocal}/${data.objrelatedstory[3].storyImage1}`}
                                      alt={`Hastakshep.com-${formatAltString(
                                        data.category_Name,
                                        data.keywords
                                      )}`}
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                      }}
                                      onError={(e) => {
                                        e.target.src =
                                          "/images/DefaultImageHastakshep.webp";
                                      }}
                                      className="img-fluid"
                                    />
                                    <div className="grad-overlay" />
                                  </a>
                                </Link>
                                <div className="media-caption">
                                  <div className="caption-content">
                                    <h3 className="axil-post-title hover-line hover-line">
                                      <Link
                                        href={`/${data.objrelatedstory[3].redirectURL.replace(
                                          "\\",
                                          "/"
                                        )}`}
                                        target="_blank" 
                                      >
                                        {data.objrelatedstory[3].storyheading}
                                      </Link>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <AdSenseSidebar />
                <WidgetNewsletter />
                <AdSenseEndOfArticle />
                <WidgetCategory cateData={[]} />
                <AdSenseSidebar2 />
                <WidgetPost dataPost={[]} />
                <WidgetSocialShare1 />
                <FeaturedImageAd />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

// export default SingleNewsInfo;
'use client'
import { getJWTToken } from "../../api/authToken";

export const getServerSideProps = async ({ params }) => {
  let data = {};
  let token = await getJWTToken(process.env.NEXT_PUBLIC_AUTHENTICATION_KEY);

  try {
    // Check if 'old' category and redirect accordingly
    if (params.category === "old") {
      return {
        redirect: {
          destination: `/${encodeURIComponent(params.info)}`,
          permanent: false,
        },
      };
    }

    try {
      // Check if 'old' category and redirect accordingly
      if (params.category.indexOf("http") > -1) {
        return {
          redirect: {
            destination: `/`,
            permanent: false,
          },
        };
      }
    }
  catch (error) {
    console.error('Error fetching data:', error);
    data = { error: 'Failed to fetch data' };
  }

    // Check for 'news-2' and redirect accordingly
    if (params.category.indexOf("news-2") == 0 || params.category.indexOf("news-2-") == 0 ||  params.category.indexOf("english") == 0 || params.category.indexOf("english") == 0 ||  params.category.indexOf("opinion") == 0 ||  params.category.indexOf("opinion-") == 0 ||
       params.category.indexOf("column") == 0 || params.category.indexOf("column-") == 0 || params.category.indexOf("opinino-column") == 0 || params.category.indexOf("opinin-column-") == 0 || params.category.indexOf("technology-and-science-") == 0 || params.category.indexOf("technology-and-science") == 0  || params.category.indexOf("politics-") == 0 || params.category.indexOf("politics") == 0 || params.category.indexOf("world-news-") == 0 || params.category.indexOf("world-news") == 0 || params.category.indexOf("old") == 0) {
      const newCategory = params.category.replace("news-2-", "").replace("news-2", "").replace("english-", "").replace("english", "").replace("opinion-column-", "").replace("opinion-column", "").replace("opinion-", "").replace("opinion", "").replace("column-", "").replace("column", "").replace("technology-and-science-", "").replace("technology-and-science", "").replace("politics-", "").replace("politics", "").replace("world-news-", "").replace("world-news", "").replace("old", "");
      return {
        redirect: {
          destination: `/${encodeURIComponent(newCategory)}`,
          permanent: false,
        },
      };
    }

    // Fetch data for valid category
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetCompleteStory?storySubheading=${params.category}`;
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    data = await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    data = { error: 'Failed to fetch data' };
  }

  return { props: { setDataDetail: data } };
};