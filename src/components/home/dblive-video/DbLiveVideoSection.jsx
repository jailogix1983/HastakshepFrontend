import React, { useEffect, useState } from "react";
import getYouTubeDbVideos from "../../../api/getYouTubeVideos";
import DbBigVideo from "./layout/DbBigVideos";
import DbLiveAllVideo from "./layout/DbLiveAllVideo";
import PostSkeleton from "../../skeleton/PostSkeleton";
// import SectionTitle from "../../common/SectionTitle";


const DbLiveVideoSection = () => {
    const [dbvideos, setDbVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState({});


    useEffect(() => {
        async function Load() {
            setIsLoading(true)
            try {
                const playlistID = process.env.NEXT_PUBLIC_DB_VIDEO_SECTION_PLAYLIST_ID;
                const data = await getYouTubeDbVideos({ playlistID });
                const playlistItems = data.items;
                const videoData = playlistItems
                    .filter((item) => item.snippet.title !== "Private video" && item.snippet.title !== "Deleted video")
                    .map((item) => ({
                        videoId: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        image: item.snippet.thumbnails.medium.url,
                        description: item.snippet.description,
                        channelTitle: item.snippet.channelTitle,
                        publishedAt: item.snippet.publishedAt,
                    }));
                setActiveVideo(videoData[0])
                setDbVideos(videoData);
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        Load()
    }, []);

    if (isLoading) {
        return <section className="container">
            <div className="row">
                <div className="col-lg-6">
                    <PostSkeleton limit={4} />
                </div>
                <div className="col-lg-6">
                    <PostSkeleton limit={4} />
                </div>
            </div>
        </section>
    }

    if (dbvideos.length === 0) {
        return <div>No data!</div>
    }

    return (
        <>
            <div className="axil-video-posts section-gap section-gap-top__with-text bg-grey-dark-one" style={{ backgroundColor: "#ffffff" }}>
                <div className="container">
                    {/* <SectionTitle title="Video" btnText="All Videos" pClass="title-white m-b-xs-40" style={{ color: "green", backgroundColor: "red" }} /> */}
                    {/* <p style={{ color: "red" }}>{dbvideos[0].channelTitle}</p> */}

                    <div className="row">


                        <div className="col-lg-8">
                            <div className="title-left title-style04 underline04">
                                <h4>{dbvideos[0].title}</h4>
                            </div>
                            <DbBigVideo dbvideo={activeVideo} />
                            <ul className="p-0 mt-2" style={{ listStyle: "none" }}>
                                <li>
                                    <i className="fa fa-calendar" /> <span>published at:</span> {dbvideos[0].publishedAt}
                                </li>

                            </ul>


                            <p style={{ fontSize: "1.5rem" }}>{dbvideos[0].description}</p>

                        </div>
                        <div className="col-lg-4" style={{ maxHeight: "95vh", overflowY: "auto" }}>
                            <DbLiveAllVideo dbvideos={dbvideos.slice(1)} setActiveVideo={setActiveVideo} />

                        </div>

                    </div>

                </div>

                {/* content section */}


            </div>
        </>
    );
}

export default DbLiveVideoSection;