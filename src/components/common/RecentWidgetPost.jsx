import React, { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";
import { formatAltString, slugify } from "../../utils";
import PostSkeleton from "../skeleton/PostSkeleton";
import { getRecentNews } from "../../api/recentNews";

const RecentWidgetPost = ({ data, pClass, videoIcon }) => {
    const [recentWidgetNews, setRecentWidgetNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH;

    useEffect(() => {
        async function Load() {
            try {
                const data = await getRecentNews();
                setRecentWidgetNews(data)
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }
        Load()
    }, []);

    if (isLoading) {
        return <PostSkeleton limit={3} />
    }

    if (recentWidgetNews.length === 0) {
        return <h5>No data found!</h5>
    }

    return (
        <>
            {
                recentWidgetNews.slice(3, 6).map((data, index) => {
                    return (
                        <div className={`media post-block post-block__small ${pClass ?? "post-block__on-dark-bg m-b-xs-30"}`} style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", padding: "10px" }} key={index}>
                            <Link href={`/${data.englishurl}`}>
                                <a className="align-self-center">
                                    <img
                                        src={`${ImagePathLocal}/${data.storyImageThumb || data.storyImage1}`}
                                        alt={`Hastakshep.com-${formatAltString(data?.category_Name, data?.keywords)}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                            // Adding transitions for smoother effects
                                            borderRadius: "5px",
                                            display: 'block',

                                        }}
                                        onError={(e) => {
                                            const imgElement = e.target;
                                            imgElement.src = '/images/DefaultImageHastakshep.webp'; // Replace with the path to your error image
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.1)';

                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';

                                        }}
                                        loading = "lazy"
                                    />
                                    {videoIcon === true ? <span className="video-play-btn video-play-btn__small" /> : ""}
                                </a>
                            </Link>

                            <div className="media-body">
                                <div className="post-cat-group">
                                    <Link href={`/${data?.englishurl}?${data?.englishurl}`}>
                                        <a className={`post-cat ${data.cate_bg ?? "bg-color-blue-one"}`}>{data.category_name || "Recent News"}</a>
                                    </Link>
                                </div>
                                <h3 className="axil-post-title hover-line hover-line">
                                    <Link href={`/${data.redirectURL.replace("\\", "/")}`}>
                                        <a>{data.storyheading || data.storyHeading}</a>
                                    </Link>
                                </h3>
                                {/* storySynopsis */}
                                <p className="hover-line" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>

                                    {data.storySynopsis?.substring(0, 52) || ""}
                                    {/* {data.storysubheading?.substring(0, 52) || ""} */}


                                    {data.storySynopsis?.length > 52 && "..."}
                                    {/* {data.storysubheading?.length > 52 && "..."} */}
                                </p>
                                <div className="post-metas">
                                    <ul className="list-inline">
                                        <span> <i className="fa fa-edit" style={{ color: "#006EE5" }}></i> By <Link href={`/author/${data?.author}`}>
                                            {data?.author.replace("-", " ") || 'Hastakshep'}
                                        </Link></span>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>

    );
};

export default RecentWidgetPost;
