import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { APIGetCommentByEpisodeId, APIPostCommentByEpisodeId } from '../../../../api/axios/commentAPI';
import { commentActions } from '../../../../api/redux/slices/commentSlice';

function ReviewForm({ episodeWatchingId, commentLoading, setCommentLoading }) {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false); //Loading when on submit loading call API

    const loadCommentByEpisodeId = async () => {
        setCommentLoading(true)
        console.log("Calling api get comment");
        const resGetCommentEpisode = await APIGetCommentByEpisodeId(episodeWatchingId);
        if (resGetCommentEpisode?.status === 200) {
            const updateCommentListAction = commentActions.updateList(resGetCommentEpisode.data);
            dispatch(updateCommentListAction);
        }
        setCommentLoading(false)
    };

    const formik = useFormik({
        initialValues: {
            content: "",
        },
        onSubmit: async ({ content }) => {
            setLoading(true)
            const resComment = await APIPostCommentByEpisodeId(content, episodeWatchingId)
            if (resComment.status === 200) {
                loadCommentByEpisodeId()
                setLoading(false)
            } else if (resComment.response.status === 400) {
                setLoading(false)
            }
        }
    })

    return (
        <div className="anime__details__form">
            <div className="section-title">
                <h5>Your Comment</h5>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    type='text'
                    id='content'
                    placeholder="Your Comment ...."
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />

                <button type="submit">

                    {loading ?
                        (
                            <React.Fragment>
                                <BeatLoader
                                    speedMultiplier={0.8}
                                    margin={0}
                                    size={11}
                                    color="#fff"
                                /> Sending...
                            </React.Fragment>
                        ) :
                        (<React.Fragment>
                            <i className="fa fa-location-arrow" />
                            Send
                        </React.Fragment>)
                    }
                </button>
            </form>
        </div>
    )
}

export default ReviewForm
