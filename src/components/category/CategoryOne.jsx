import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";

const CategoryOne = ({ cateData }) => {
  // Extract categories and count occurrences
  const categoryCounts = cateData.reduce((acc, data) => {
    acc[data.cate] = (acc[data.cate] || 0) + 1;
    return acc;
  }, {});

  // Prepare category list with necessary data
  const cateList = Object.keys(categoryCounts).map(cateTitle => {
    const imgGet = cateData.find(post => post.cate === cateTitle);
    return {
      name: cateTitle,
      slug: slugify(cateTitle),
      count: categoryCounts[cateTitle],
      cateImg: imgGet ? imgGet.cate_img : "/images/placeholder.png" // fallback image
    };
  });

  return (
    <div className="axil-banner-cat-counter">
      <div className="container">
        <div className="axil-content">
          <ul className="category-list-wrapper">
            {cateList.slice(0, 5).map((data) => (
              <li className="category-list perfect-square" key={data.slug}>
                <Link href={`/category/${data.slug}`}>
                  <a className="list-inner" aria-label={`Navigate to ${data.name} category`}>
                    <div className="image-wrapper">
                      <Image
                        src={data.cateImg}
                        alt={data.name}
                        width={160}
                        height={160}
                        layout="responsive"
                      />
                    </div>
                    <div className="post-info-wrapper overlay">
                      <div className="counter-inner">
                        <span className="counter">{data.count}</span>+
                      </div>
                      <h4 className="cat-title">{data.name}</h4>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          {/* End of .category-list-wrapper */}
        </div>
        {/* End of .axil-content */}
      </div>
      {/* End of .container */}
    </div>
  );
};

export default CategoryOne;
