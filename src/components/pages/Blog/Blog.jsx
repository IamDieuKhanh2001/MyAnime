import React from "react";
import "./Blog.scss";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";
import BannerBlog from "./BannerBlog/BannerBlog";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();
  return (
    <div className="blog">
      <Header />
      <BannerBlog />
      <div className="blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-1.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Yuri Kuma Arashi Viverra Tortor Pharetra</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item small__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-4.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Bok no Hero Academia Season 4 – 18</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item small__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-5.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Fate/Stay Night: Untimated Blade World</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-7.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">
                          Housekishou Richard shi no Nazo Kantei Season 08 - 20
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item small__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-10.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Fate/Stay Night: Untimated Blade World</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item small__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-11.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Building a Better LiA Drilling Down</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item small__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-2.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Fate/Stay Night: Untimated Blade World</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item small__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-3.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Building a Better LiA Drilling Down</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-6.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Yuri Kuma Arashi Viverra Tortor Pharetra</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item small__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-8.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Bok no Hero Academia Season 4 – 18</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item small__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-9.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Fate/Stay Night: Untimated Blade World</a>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div
                    onClick={() => navigate("/blog-detail")}
                    className="blog__item set-bg"
                    style={{ backgroundImage: "url('img/blog/blog-12.jpg')" }}
                  >
                    <div className="blog__item__text">
                      <p>
                        <span className="icon_calendar" /> 01 March 2020
                      </p>
                      <h4>
                        <a href="">Yuri Kuma Arashi Viverra Tortor Pharetra</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
