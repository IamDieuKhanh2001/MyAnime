import React from "react";
import "./ListSeries.scss";
import ReactStars from "react-rating-stars-component";

export default function ListSeries() {
  return (
    <>
      <div className="titleList">List Series</div>
      <div className="allMovieLine">
        <div className="allMovieContent">
          <figure className="movieItemImg">
            <img src="/img/laban.png" alt="San pham cua ban" />
          </figure>
          <div className="movieItemTitle">
            Game Of Thrones
            <br />
          </div>
          <div className="movieItemStars">
            <ReactStars
              value={5}
              edit={false}
              isHalf={true}
              size={20}
              color="#FDDA0D"
              activeColor="#FDDA0D"
              className="star"
            />
          </div>
          <button className="btn editButton">
            <i className="bx bx-edit"></i>
          </button>
          <div className="btn deleteButton">
            <i className="bx bx-trash"></i>
          </div>
        </div>
      </div>

      <div className="allMovieLine">
        <div className="allMovieContent">
          <figure className="movieItemImg">
            <img src="/img/cnx.jpg" alt="San pham cua ban" />
          </figure>
          <div className="movieItemTitle">
            The Walking Dead
            <br />
          </div>
          <div className="movieItemStars">
            <ReactStars
              value={5}
              edit={false}
              isHalf={true}
              size={20}
              color="#FDDA0D"
              activeColor="#FDDA0D"
              className="star"
            />
          </div>
          <button className="btn editButton">
            <i className="bx bx-edit"></i>
          </button>
          <div className="btn deleteButton">
            <i className="bx bx-trash"></i>
          </div>
        </div>
      </div>

      <div className="allMovieLine">
        <div className="allMovieContent">
          <figure className="movieItemImg">
            <img src="/img/123go.png" alt="San pham cua ban" />
          </figure>
          <div className="movieItemTitle">
            Manchester United
            <br />
          </div>
          <div className="movieItemStars">
            <ReactStars
              value={5}
              edit={false}
              isHalf={true}
              size={20}
              color="#FDDA0D"
              activeColor="#FDDA0D"
              className="star"
            />
          </div>
          <button className="btn editButton">
            <i className="bx bx-edit"></i>
          </button>
          <div className="btn deleteButton">
            <i className="bx bx-trash"></i>
          </div>
        </div>
      </div>
    </>
  );
}
