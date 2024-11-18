import WidgetCategory from "../../widget/WidgetCategory";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import SectionTitle from "../../common/SectionTitle";
import PramukhSamacharNews from "./layout/PramukhSamacharNews";
import FileSeperator from "../../common/FileSeperator";
import AdSenseSidebar from "../../common/AdSenseSidebar";
import AdSenseSidebar2 from "../../common/AdSenseSidebar2";
import AdSenseEndOfArticle from "../../common/AdSenseEndOfArticle ";
import AdSenseHead from "../../common/AdSenseHead";
import FeaturedImageAd from "../../common/FeaturedImageAd";

const PramukhSamacharSection = ({ postData, adBanner }) => {
  return (
    <>
      <div className={`random-posts section-gap`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <AdSenseHead />
              <SectionTitle
                title="आपकी नज़र"
                // btnText="सभी आपकी नज़र"
                btnText=""
              />

              <div className="axil-content">
                <PramukhSamacharNews />
                <FeaturedImageAd />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <AdSenseHead />
                <WidgetNewsletter />
                <WidgetCategory cateData={postData} />
                <AdSenseSidebar />
                <AdSenseSidebar2 />
                <WidgetPost dataPost={postData} />
                <AdSenseEndOfArticle />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FileSeperator />
    </>
  );
};

export default PramukhSamacharSection;
