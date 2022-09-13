import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APIGetCommentByEpisodeId } from '../../../api/axios/commentAPI';
import { commentActions } from '../../../api/redux/slices/commentSlice';
import ReviewItem from './ReviewItem/ReviewItem'

function AnimeReview({ episodeWatching }) {
  const dispatch = useDispatch();

  const jwtTokenLogin = window.sessionStorage.getItem("jwt");

  const [commentLoading, setCommentLoading] = useState(false)

  const commentList = useSelector((state) => state.comments.list);

  const loadCommentByEpisodeId = async () => {
    setCommentLoading(true)
    console.log("Calling api get comment");
    const resGetCommentEpisode = await APIGetCommentByEpisodeId(episodeWatching.id);
    console.log(resGetCommentEpisode)
    console.log(resGetCommentEpisode.data)
    if (resGetCommentEpisode?.status === 200) {
      const updateCommentListAction = commentActions.updateList(resGetCommentEpisode.data);
      dispatch(updateCommentListAction);
    }
    setCommentLoading(false)
  };

  useEffect(() => {
    loadCommentByEpisodeId();
  }, []);

  return (
    <React.Fragment>
      <div className="anime__details__review">
        <div className="section-title">
          <h5>Reviews</h5>
        </div>
        {jwtTokenLogin !== null ? (
          <React.Fragment>
            {commentList.map((comment, index) => (
              <ReviewItem data={comment} />
            ))}
          
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="anime__review__item">
              <div className="anime__review__item__pic">
                <img src="/img/anime/adminstrator.jpg" alt />
              </div>
              <div className="anime__review__item__text">
                <h6>
                  Administrator - <span>Please login!!</span>
                </h6>
                <p>
                  Bạn cần phải đăng nhập để có thể xem được comment của series này!
                  <br />
                  <a href='/login'>Nhấn vào đây để đăng nhập</a>
                </p>
              </div>
            </div>
          </React.Fragment>
        )}

      </div>
      <div className="anime__details__form">
        <div className="section-title">
          <h5>Your Comment</h5>
        </div>
        <form action="#">
          <textarea placeholder="Your Comment" defaultValue={""} />
          <button type="submit">
            <i className="fa fa-location-arrow" /> Review
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default AnimeReview
