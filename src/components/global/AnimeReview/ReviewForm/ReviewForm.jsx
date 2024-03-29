import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { APIGetCommentByEpisodeId, APIPostCommentByEpisodeId } from '../../../../api/axios/commentAPI';
import { commentActions } from '../../../../api/redux/slices/commentSlice';
import { filterContent } from '../../../../utils/filterContent';

function ReviewForm({ episodeWatchingId, commentLoading, setCommentLoading }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false); //Loading when on submit loading call API

    // const loadCommentByEpisodeId = async () => {
    //     setCommentLoading(true)
    //     console.log("Calling api get comment");
    //     const resGetCommentEpisode = await APIGetCommentByEpisodeId(episodeWatchingId);
    //     if (resGetCommentEpisode?.status === 200) {
    //         const updateCommentListAction = commentActions.updateList(resGetCommentEpisode.data);
    //         dispatch(updateCommentListAction);
    //     }
    //     setCommentLoading(false)
    // };

    const formik = useFormik({
        initialValues: {
            content: "",
        },
        onSubmit: async values => {
            setLoading(true)
            const filteredComment = filterContent(values.content) // filter bad words
            const resComment = await APIPostCommentByEpisodeId(filteredComment, episodeWatchingId)
            values.content = ""                                 //Set initialValues to default
            if (resComment.status === 200) {
                // loadCommentByEpisodeId()
                const updateCommentAction = commentActions.addFirstListComments(resComment.data)
                dispatch(updateCommentAction)
                setLoading(false)
            } else if (resComment.response.status === 400) {
                toast.error("Something when wrong, try again later")
                setLoading(false)
            }
        }
    })

    return (
        <div className="anime__details__form pb-4">
            <div className="section-title">
                <h5>
                    {t("anime_review.section_write_review_title")}
                </h5>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    type='text'
                    id='content'
                    placeholder={t("anime_review.content_placeholder")}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />

                <button type="submit" disabled={loading}>

                    {loading ?
                        (
                            <React.Fragment>
                                <BeatLoader
                                    speedMultiplier={0.8}
                                    margin={0}
                                    size={11}
                                    color="#fff"
                                /> {t("anime_review.btn_sending_text")}
                            </React.Fragment>
                        ) :
                        (<React.Fragment>
                            <i className="fa fa-location-arrow" />
                            {t("anime_review.btn_send_text")}
                        </React.Fragment>)
                    }
                </button>
            </form>
        </div>
    )
}

export default ReviewForm
