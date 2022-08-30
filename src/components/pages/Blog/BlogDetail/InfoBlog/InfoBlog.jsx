import React from "react";
import "./InfoBlog.scss";

export default function InfoBlog() {
  return <div className="infoBlog">
    <div className="col-lg-12">
              <div className="blog__details__title">
                <h6>
                  Action, Magic <span>- March 08, 2020</span>
                </h6>
                <h2>Anime for Beginners: 20 Pieces of Essential Viewing</h2>
                <div className="blog__details__social">
                  <a href="#" className="facebook">
                    <i className="fa fa-facebook-square" /> Facebook
                  </a>
                  <a href="#" className="pinterest">
                    <i className="fa fa-pinterest" /> Pinterest
                  </a>
                  <a href="#" className="linkedin">
                    <i className="fa fa-linkedin-square" /> Linkedin
                  </a>
                  <a href="#" className="twitter">
                    <i className="fa fa-twitter-square" /> Twitter
                  </a>
                </div>
              </div>
            </div>
  </div>;
}
