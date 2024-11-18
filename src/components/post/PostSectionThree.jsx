import SectionTitle from "../common/SectionTitle";
import PostLayoutTwo from "../home/recent-news/layout/RecentNews";

const PostSectionThree = ({ postData }) => {

  const trendingPost = postData.filter(post => post.trending === true);

  return (
    <div className="section-gap section-gap-top__with-text trending-stories">
      <div className="container">
        <SectionTitle title="Hastakshep Stories" btnText="ALL HASTAKSHEP STORIES" />
        <div className="row">
          {trendingPost.slice(0, 6).map((data) => (
            <div className="col-lg-6" key={data.slug}>
              <PostLayoutTwo data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostSectionThree;
