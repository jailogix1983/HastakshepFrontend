import React, { useEffect, useState } from 'react';
import SectionTitle from '../../common/SectionTitle';
import AllVideos from './layout/AllVideos';
import BigVideos from './layout/BigVideos';
import FileSeperator from '../../common/FileSeperator';
import getYouTubeVideos from '../../../api/getYouTubeVideos';
import PostSkeleton from '../../skeleton/PostSkeleton';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null); // Initially no active video

  useEffect(() => {
    async function loadVideos() {
      try {
        const playlistID = process.env.NEXT_PUBLIC_VIDEO_SECTION_PLAYLIST_ID;
        const data = await getYouTubeVideos({ playlistID });
        const playlistItems = data.items.filter(
          (item) =>
            item.snippet.title !== 'Private video' &&
            item.snippet.title !== 'Deleted video'
        );

        const videoData = playlistItems.map((item) => ({
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          image: item.snippet.thumbnails.medium.url,
          description: item.snippet.description,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
        }));

        setVideos(videoData);
        setActiveVideo(videoData[0]); // Set first video as active initially
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    loadVideos();
  }, []);



  if (videos.length === 0) {
    return <div>No videos found!</div>;
  }

  return (
    <>
      <div className="axil-video-posts section-gap section-gap-top__with-text bg-grey-dark-one" style={{ marginTop: '50px' }}>
        <div className="container">
          <SectionTitle
            title="वीडियो"
            btnText="सभी वीडियो"
            pClass="title-white m-b-xs-40"
          />
          <div className="row">
            <div className="col-lg-8">
              <BigVideos video={activeVideo} />
            </div>
            <div className="col-lg-4" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
              <AllVideos videos={videos.slice(1)} setActiveVideo={setActiveVideo} />
            </div>
          </div>
        </div>
      </div>
      <FileSeperator />
    </>
  );
};

export default VideoSection;
