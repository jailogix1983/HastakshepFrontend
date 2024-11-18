import Image from "next/image";
import Link from "next/link";
import { formatAltString, slugify } from "../../../../utils";

const TechnologyScience = ({ data }) => {
  const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;

  return (
    <>
      <div className={`axil-img-container m-b-xs-30`}>
        <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
          <a className={`d-block h-100`}>
            <img
              src={`${ImagePathLocal}/${data.storyImage1}`}
              alt={`Hastakshep.com-${formatAltString(data?.category_Name, data?.keywords)}`}
              style={{ width: "350px", height: "300px", objectFit: "fill" }}
              onError={(e) => {
                const imgElement = e.target;
                imgElement.src = "/images/DefaultImageHastakshep.webp";
              }}
              className="w-100"
              loading="lazy"
            />
            <div className={`grad-overlay`} />
          </a>
        </Link>
        <div
          className="post-cat-group m-b-xs-10"
          style={{ position: "absolute", top: "10px", left: "10px" }}
        >
          <Link href={`/${data?.englishurl}?${data?.englishurl}`}>
            <a className={`post-cat cat-btn btn-mid bg-color-blue-one `}>
              {data?.category_name || data?.category_Name || data?.englishurl}
            </a>
            {/* {data.englishurl || "News"} */}
          </Link>
        </div>
        <div className="media post-block position-absolute">
          <div className={`media-body`}>
            <div className="axil-media-bottom">
              <h3 className="axil-post-title hover-line hover-line">
                <Link href={`/${data?.redirectURL.replace("\\", "/")}`}>
                  <a>{data?.storyHeading?.substring(0, 60) || "..."}</a>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnologyScience;
