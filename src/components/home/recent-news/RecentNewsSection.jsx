import SectionTitle from "../../common/SectionTitle";
import RecentBigNews from "./layout/RecentBigNews";
import RecentNews from "./layout/RecentNews";
import Recentliveblog from "../recent-liveblog/Recentliveblogsection";

const RecentNewsSection = () => {
  return (
    <>
      <div className="recent-news-wrapper section-gap p-t-xs-15 p-t-sm-20">
        <div className="col-lg-6"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <RecentBigNews />
            </div>

            <div className="col-lg-6">
              <div className="axil-Breaking-News">
                <div className="axil-content">
                  <Recentliveblog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentNewsSection;
