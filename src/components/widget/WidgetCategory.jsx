import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { slugify } from "../../utils";
import { getCategories } from "../../api/categories";
import PostSkeleton from "../skeleton/PostSkeleton";

const WidgetCategory = ({ cateData }) => {
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;
  const CustomNavRef = useRef(null);

  const [categoriesdata, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getCategories();

        if (!ignore) {
          setCategoriesData(data);
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

  useEffect(() => {
    const adjustTabIndex = () => {
      const ariaHiddenElements = document.querySelectorAll('[aria-hidden="true"] a');
      ariaHiddenElements.forEach(element => {
        element.setAttribute('tabindex', '-1');
      });

      const ariaVisibleElements = document.querySelectorAll('[aria-hidden="false"] a, [aria-hidden="false"] button');
      ariaVisibleElements.forEach(element => {
        element.setAttribute('tabindex', '0');
      });
    };

    adjustTabIndex();
  }, [categoriesdata]);

  const slideSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    afterChange: () => {
      setTimeout(() => {
        const adjustTabIndex = () => {
          const ariaHiddenElements = document.querySelectorAll('[aria-hidden="true"] a');
          ariaHiddenElements.forEach(element => {
            element.setAttribute('tabindex', '-1');
          });

          const ariaVisibleElements = document.querySelectorAll('[aria-hidden="false"] a, [aria-hidden="false"] button');
          ariaVisibleElements.forEach(element => {
            element.setAttribute('tabindex', '0');
          });
        };
        adjustTabIndex();
      }, 0);
    }
  };

  if (isLoading) {
    return <PostSkeleton limit={3} />;
  }

  if (categoriesdata?.length === 0) {
    return <h5>No data found!</h5>;
  }

  const categories = cateData?.map((data) => {
    const obj = {
      name: data.cate,
      thumb: data.cate_img,
    };
    return obj;
  });

  const category = categories?.reduce((prev, curr) => {
    prev[curr.name] = (prev[curr.name] || 0) + 1;
    return prev;
  }, {});

  var cateList =
    category &&
    Object.keys(category).map((cateTitle) => {
      const imgGet = categories?.filter((post) => post.name === cateTitle);

      return {
        name: cateTitle,
        slug: slugify(cateTitle),
        count: category[cateTitle],
        cateImg: imgGet[0].thumb,
      };
    });

  return (
    <>
      <div className="category-widget m-b-xs-40">
        <div className="widget-title">
          <h3>Categories</h3>
          <div className="owl-nav">
            <button
              className="custom-owl-prev" 
              aria-label="Previous Slide"
              onClick={() => CustomNavRef?.current?.slickPrev()}
            >
              <i className="feather icon-chevron-left" />
            </button>
            <button
              className="custom-owl-next"
               aria-label="Next Slide"
              onClick={() => CustomNavRef?.current?.slickNext()}
            >
              <i className="feather icon-chevron-right" />
            </button>
          </div>
        </div>
        <div className="category-carousel">
          <Slider ref={CustomNavRef} {...slideSettings}>
            <div className="cat-carousel-inner">
              <ul className="category-list-wrapper">
                {categoriesdata.slice(0, 4).map((data, index) => (
                  <li className="category-list perfect-square" key={index}>
                    <Link href={`/${data?.category_name}/${data?.englishUrl}`}>
                      <a className="custom_card">
                        <div className="post-info-wrapper ">
                          <div className="counter-inner">
                            <span className="counter">
                              {data.category_type}
                            </span>
                            <i className="fa fa-list-ul"></i>
                          </div>
                          <br></br>
                          <h4 className="cat-title" style={{ fontSize: "1.8rem" }}>
                            {data.category_name}
                          </h4>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cat-carousel-inner">
              <ul className="category-list-wrapper">
             
                {categoriesdata.slice(4, 8).map((data, index) => (
                  <li className="category-list perfect-square" key={index}>
                    <Link href={`/${data?.category_name}/${data?.englishUrl}`}>
                      <a className="custom_card">
                        <div className="post-info-wrapper overlay">
                          <div className="counter-inner">
                            <span className="counter">{data.count}</span>
                            <i className="fa fa-list-ul"></i>
                          </div>
                          <br></br>
                          <h4 className="cat-title" style={{ fontSize: "1.8rem" }}>
                            {data.category_name}
                          </h4>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cat-carousel-inner">
              <ul className="category-list-wrapper">
                {categoriesdata.slice(8, 12).map((data, index) => (
                  <li className="category-list perfect-square" key={index}>
                    <Link href={`/${data?.category_name}/${data?.englishUrl}`}>
                      <a className="custom_card">
                        <div className="post-info-wrapper overlay">
                          <div className="counter-inner">
                            <span className="counter">{data.count}</span>
                            <i className="fa fa-list-ul"></i>
                          </div>
                          <br></br>
                          <h4 className="cat-title" style={{ fontSize: "1.8rem" }}>
                            {data.category_name}
                          </h4>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default WidgetCategory;
