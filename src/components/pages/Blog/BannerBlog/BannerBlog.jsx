import React from "react";

export default function BannerBlog() {
  return (
    <div className="bannerBlog">
      <div
        className="normal-breadcrumb set-bg"
        style={{ backgroundImage: "url('img/normal-breadcrumb.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="normal__breadcrumb__text">
                <h2>Our Blog</h2>
                <p>Welcome to the official Anime&nbsp;blog.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
