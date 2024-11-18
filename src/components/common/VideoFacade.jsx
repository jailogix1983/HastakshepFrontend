import { useEffect } from "react";
import getYouTubeVideos from "../../api/getYouTubeVideos";

const VideoFacade = ({ setVideos, setActiveVideo, setIsLoading }) => {
    useEffect(() => {
        const loadVideos = async () => {
            try {
                const playlistID = process.env.NEXT_PUBLIC_VIDEO_SECTION_PLAYLIST_ID;
                const data = await getYouTubeVideos({ playlistID });
                const videoData = data.items
                    .filter(
                        (item) =>
                            item.snippet.title !== "Private video" &&
                            item.snippet.title !== "Deleted video"
                    )
                    .map((item) => ({
                        videoId: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        image: item.snippet.thumbnails.medium.url,
                        description: item.snippet.description,
                        channelTitle: item.snippet.channelTitle,
                        publishedAt: item.snippet.publishedAt,
                    }));
                setVideos(videoData);
                setActiveVideo(videoData[0]);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        loadVideos();
    }, [setVideos, setActiveVideo, setIsLoading]);

    return null;
};

export default VideoFacade;
