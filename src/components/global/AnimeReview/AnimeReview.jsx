import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APIGetCommentByEpisodeId } from '../../../api/axios/commentAPI';
import { commentActions } from '../../../api/redux/slices/commentSlice';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import ReviewForm from './ReviewForm/ReviewForm';
import ReviewItem from './ReviewItem/ReviewItem'
import ReviewNotification from './ReviewNotification/ReviewNotification';

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
        {commentLoading ? (<LoadingAnimation />) :
          (<React.Fragment>
            {commentList.map((comment, index) => (
              <ReviewItem data={comment} key={index} />
            ))}
          </React.Fragment>)}
        {jwtTokenLogin === null && (
          <ReviewNotification />
        )}

      </div>

      {jwtTokenLogin !== null && (
        <ReviewForm
          episodeWatchingId={episodeWatching.id}
          commentLoading={commentLoading}
          setCommentLoading={setCommentLoading}
        />
      )}

    </React.Fragment>
  )
}

export default AnimeReview
