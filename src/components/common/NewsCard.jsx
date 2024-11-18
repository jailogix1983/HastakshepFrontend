import React, { useEffect } from "react";
import Link from "next/link";
import { formatAltString } from "../../utils";
import Image from "next/image";

const NewsCard = ({ data }) => {
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;
  // const linkHref = `/${data?.redirectURL}`;
  const linkText = data?.storyheading || data?.storyHeading;

  useEffect(() => {
    const ariaHiddenElements = document.querySelectorAll('[aria-hidden="true"] a');
    ariaHiddenElements.forEach(element => {
      element.setAttribute('tabindex', '-1');
    });
  }, []);

  return (
    <React.Fragment>
      <div
        className="media post-block m-b-xs-30"
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: "10px",
        }}
      >
        <span className="align-self-center">
          <Link href={`/${data?.redirectURL}`} >
            <a aria-label={linkText}>
              <img
                src={`${ImagePathLocal}/${data?.storyImageThumb || data?.storyImage1}`}
                alt={`Hastakshep.com-${formatAltString(
                  data?.category_name,
                  data?.keywords
                )}`}
                style={{ objectFit: "fill" }}
                className="TajaKhabar"
                onError={(e) => {
                  const imgElement = e.target;
                  imgElement.src = '/images/DefaultImageHastakshep.webp';
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </a>
          </Link>
        </span>

        <div className="media-body">
          <div className="post-cat-group">
            <Link href={`/${data?.englishurl}/${data?.englishurl}`}>
              <a aria-label={data?.category_name || data?.category_Name || data?.englishurl}>
                <span
                  style={{ cursor: "pointer" }}
                  className="post-cat cat-btn bg-color-blue-one"
                >
                  {data?.category_name || data?.category_Name || data?.englishurl}
                </span>
              </a>
            </Link>
          </div>
          <h3
            className="axil-post-title hover-line"
            style={{ marginBottom: "0", cursor: "pointer" }}
          >
            <Link href={`/${data?.redirectURL}`} >
              <a aria-label={linkText} >
                {linkText}
              </a>
            </Link>
          </h3>

          <Link href={`/${data?.redirectURL}`}>
            <a aria-label={data?.storySynopsis?.substring(0, 52) || ""}>
              <p
                className="hover-line"
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                }}
              >
                {data?.storySynopsis?.substring(0, 52) || ""}
                {data?.storysubheading?.substring(0, 52) || ""}
                {data?.storySynopsis?.length > 52 && "..."}
                {data?.storysubheading?.length > 52 && "..."}
              </p>
            </a>
          </Link>

          <div className="post-metas" style={{ marginBottom: "1rem" }}>
            <ul className="list-inline">
              <li>
                <span>
                  <i className="fa fa-edit" style={{ color: "#006EE5" }}></i> By{" "}
                  <Link href={`/author/${data?.author}`}>
                    <a aria-label={data?.author || "Hastakshep"}>
                      {data?.author.replace("-", " ") || "Hastakshep"}
                    </a>
                  </Link>
                </span>
              </li>
              <li>
                <i className="dot">.</i>
                {data?.daysago}
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
  );
};

export default NewsCard;
