import dynamic from "next/dynamic";
import { useEffect } from 'react';
import { observeLCP } from "../utils/performanceObserver";
import HeadMeta from "../components/common/HeadMeta";
import Header from "../components/header/Header";
import Marquee from "../components/common/Marquee";
import BreakingNews from "../components/common/BreakingNews";
import RecentNewsSection from "../components/home/recent-news/RecentNewsSection";
const TopStoriesSection = dynamic(() =>
  import("../components/home/top-stories/TopStoriesSection")
);
const VideoSection = dynamic(
  () => import("../components/home/video-section/VideoSection"),
  { ssr: false }
);
const PramukhSamacharSection = dynamic(
  () => import("../components/home/pramukh-samachar/PramukhSamacharSection"),
  { ssr: false }
);
const TechnologySection = dynamic(
  () => import("../components/home/technologyscience/TechnologySection"),
  { ssr: false }
);
const SamacharStoriesSection = dynamic(
  () => import("../components/home/samachar/SamacharStoriesSection"),
  { ssr: false }
);
const WebStoriesSection = dynamic(
  () => import("../components/home/web-stories/WebStoriesSection"),
  { ssr: false }
);
const Footer = dynamic(() => import("../components/footer/Footer"), {
  ssr: false,
});

const Home = () => {
  useEffect(() => {
    observeLCP();
  }, []);

  return (
    <>
      <HeadMeta metaTitle="hastakshep" />
      <Header />
      <Marquee />
      <BreakingNews />
      <RecentNewsSection />
      <TopStoriesSection />
      <SamacharStoriesSection />
      <VideoSection />
      <PramukhSamacharSection adBanner={true} />
      <WebStoriesSection />
      <TechnologySection />
      <Footer />
    </>
  );
};

export default Home;
