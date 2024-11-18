import React from "react";

export default function PostSkeleton({ limit = 1 }) {
  return (
    <>
      {[...Array(limit)].map((_, index) => (
        <section
          key={index}
          style={{ boxShadow: "0 0 9px #ddd" }}
          className={`media post-block m-b-xs-30 m-1 scale-1`}
        >
          <div className="d-flex align-items-center">
            <span
              style={{ width: "150px", height: "150px", background: "#ddd" }}
            ></span>
          </div>

          <div className="media-body p-3">
            <div className="post-cat-group m-b-xs-10">
              <span
                style={{ background: "#ddd" }}
                className={`post-cat cat-btn`}
              ></span>
            </div>
            <h3
              style={{ width: "100%", height: "70px", background: "#ddd" }}
              className="axil-post-title"
            ></h3>

            <div
              style={{ width: "100%", height: "10px", background: "#ddd" }}
            ></div>
          </div>
        </section>
      ))}
    </>
  );
}
