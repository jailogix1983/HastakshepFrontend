import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostSkeleton from "../../../components/skeleton/PostSkeleton";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../../utils";
import { GetWebStories } from "../../../api/WebStories";

export default function WebStories() {
    const router = useRouter();
    const ImagePathLocal = process.env.NEXT_PUBLIC_LOCAL_IMAGES_PATH_WEBSTORIES;
    const [webStoriesData, setWebStoriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            try {
                const url = window.location.href;
                const lastQuestionMarkIndex = url.lastIndexOf('?');
                const queryString = lastQuestionMarkIndex !== -1 ? url.slice(lastQuestionMarkIndex + 1) : null;
                const webID = queryString ? queryString.split('&').pop() : null; // Split the query string and get the last parameter                
                const data = await GetWebStories(webID);
                setWebStoriesData(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                // You might want to provide user feedback here about the error
            }
        }
        loadData();
        // Add this line to set the body background color
        document.body.style.backgroundColor = "#515252"; // Replace with your desired color
        // Remove the background color when the component is unmounted
        return () => {
            document.body.style.backgroundColor = ""; // Reset to default
        };
    }, [router.query.webstoryid]);




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
            <div className="carousel-wrap">
                <Carousel style={{ margin: "auto" }}>
                    {webStoriesData.map((data, index) => (
                        <Carousel.Item key={index}>
                            <div className="axil-img-container m-b-xs-30">
                                <a className="d-block h-100" rel="noreferrer">
                                    <div style={{ cursor: "pointer" }}>
                                        <img
                                            src={`${ImagePathLocal}/${data?.mainStoryID}/${data.coverImage}`}
                                            alt={data?.image || "Image not available"}
                                            className="w-100"
                                            style={{
                                                objectFit: "fill",
                                            }}
                                            onError={(e) => {
                                                const imgElement = e.target;
                                                imgElement.src = "/images/DefaultImageHastakshep.webp"; // Replace with the path to your error image
                                            }}
                                            loading = "lazy"
                                        />
                                    </div>
                                    <div className="grad-overlay" style={{ cursor: "pointer" }} />
                                </a>
                                <div className="media post-block position-absolute">
                                    <div className={`media-body `}>
                                        <div className="axil-media-bottom">
                                            <h3 className="axil-post-title hover-line hover-line">
                                                <a className="hover-line" rel="noreferrer">
                                                    {data?.storyHeading?.substring(0, 100) || ""}
                                                    {data?.storyHeading?.length > 150 && "..."}
                                                </a>
                                            </h3>
                                        </div>
                                        <div>
                                            <a href={data?.url} target="_blank" rel="noreferrer">Read more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className="back-btn">
                <button
                    style={{
                        backgroundImage:
                            "linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB)",
                        color: "#fff",
                    }}
                    onClick={() => router.back()}
                >
                    Back to Home
                </button>
            </div>

            {/* <div
        className="section-gap section-gap-top__with-text top-stories bg-grey-light-three"
        style={{ backgroundColor: "#212529fc" }}
      >
        
      </div> */}
        </>
    );
}
