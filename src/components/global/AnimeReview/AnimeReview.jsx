import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { APIGetCommentByEpisodeId } from '../../../api/axios/commentAPI';
import { commentActions } from '../../../api/redux/slices/commentSlice';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import ReviewForm from './ReviewForm/ReviewForm';
import ReviewItem from './ReviewItem/ReviewItem'
import ReviewNotification from './ReviewNotification/ReviewNotification';
import { useRef } from 'react';
import { useCallback } from 'react';

function AnimeReview({ episodeWatching }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const jwtTokenLogin = window.sessionStorage.getItem("jwt");


  //pageable
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false)
  const [error, setError] = useState(false);
  const observer = useRef();

  const commentList = useSelector((state) => state.comments.list);

  const lastItemRef = useCallback(
    (node) => {
      if (commentLoading || isLastPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [commentLoading, isLastPage]
  );

  useEffect(() => {
    setCommentLoading(true);
    APIGetCommentByEpisodeId(episodeWatching.id, page)
      .then(res => {
        if (res.data.length === 0) {
          setIsLastPage(true)
        } else {
          const updateCommentAction = commentActions.addExtraToListComments(res.data)
          dispatch(updateCommentAction)
        }
        setCommentLoading(false);
      })
      .catch(err => {
        setError(true);
        setCommentLoading(false);
      })
  }, [page]);

  //Chuyển trang xóa redux comment list
  useEffect(() => {

    // Return a cleanup list redux
    return () => {
      dispatch(commentActions.updateList([]))
    };
  }, [])

  return (
    <React.Fragment>
      {jwtTokenLogin !== null && (
        <ReviewForm
          episodeWatchingId={episodeWatching.id}
          commentLoading={commentLoading}
          setCommentLoading={setCommentLoading}
        />
      )}
      <div className="anime__details__review">
        <div className="section-title">
          <h5>
            {t("anime_review.section_review_title")}
          </h5>
        </div>
        {commentList.map((comment, index) => {
          if (commentList.length === index + 1) {
            return <ReviewItem data={comment} key={index} lastItemRef={lastItemRef} />
          } else {
            return <ReviewItem data={comment} key={index} />
          }
        })}
        {/* loading comment*/}
        {commentLoading && (<LoadingAnimation />)}

        {/* Error notice when loading comment fail  */}
        {error &&
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Connection error!</strong>
            <hr />
            Can not connect to server, check your connection and try again!!.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        {/* Notice when not login */}
        {jwtTokenLogin === null && (
          <ReviewNotification />
        )}

      </div>
    </React.Fragment>
  )
}

export default AnimeReview
