import React from "react";
import SectionTitle from "../../common/SectionTitle";
import SamacharStories from "./layout/SamacharStories";

export default function SamacharStoriesSection() {
  return (
    <>
      <div className="section-gap section-gap-top__with-text trending-stories">
        <div className="container">
          <SectionTitle title="समाचार" btnText="" />
          {/* btnText="सभी समाचार" */}
          <div className="row">
            <SamacharStories />
          </div>
        </div>
      </div>
    </>
  );
}
