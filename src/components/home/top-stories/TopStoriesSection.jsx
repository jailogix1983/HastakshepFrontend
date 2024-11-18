import SectionTitle from "../../common/SectionTitle";
import TopBigStories from "./layout/TopBigStories";
import TopStories from "./layout/TopStories";

import FileSeperator from "../../common/FileSeperator";

const TopStoriesSection = () => {
    return (
        <>

            <div className="section-gap section-gap-top__with-text top-stories bg-grey-light-three">
                <div style={{ marginTop: "-72px" }}>.
                    <FileSeperator />
                </div>

                <div className="container" style={{ marginTop: "50px" }}>
                    <SectionTitle
                        title="Top Stories"
                        // btnText="All Top Stories"
                        btnText=""
                    />

                    <div className="row">
                        <div className="col-lg-8">
                            <TopBigStories />
                        </div>
                        <div className="col-lg-4">
                            <div className="axil-content">
                                <TopStories />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <FileSeperator />
        </>

    );
};


export default TopStoriesSection;
