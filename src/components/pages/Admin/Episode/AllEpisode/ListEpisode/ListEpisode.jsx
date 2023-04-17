import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    APIGetEpisodeBySeriesId,
    APIGetMovieSeries,
} from "../../../../../../api/axios/adminAPI";
import { adminActions } from "../../../../../../api/redux/slices/adminSlice";
import "./ListEpisode.scss";
import { Spinner } from "react-bootstrap";
import LoadingAnimation from "../../../../../global/LoadingAnimation/LoadingAnimation";
import { CircularProgress, Dialog } from "@material-ui/core";
import UpdateEpisode from "../../UpdateEpisode/UpdateEpisode";
import { toast } from "react-toastify";

export default function ListEpisode() {
    const [loadingEp, setLoadingEp] = useState(false);
    const episodes = useSelector((state) => state.admin.movieSeriesEp);
    const [selectedEp, setSelectedEp] = useState(false);
    const [openUpdateEp, setOpenUpdateEp] = useState(false);
    const [selectedViewSeries, setSelectedViewSeries] = useState({});
    let movieSeries = useSelector((state) => state.admin.movieSeries);
    //sort movie
    const [mode, setMode] = useState('FindAll') //FindAll, FindByUsername 
    const [searchKeyword, setSearchKeyword] = useState('');
    const inputRef = useRef(null);
    //pageable
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const observer = useRef();
    //interact with store redux
    const dispatch = useDispatch();
    const getEpisodeBySeriesId = async (seriesId) => {
        try {
            dispatch(adminActions.setMovieSeriesEp([]));
            setLoadingEp(true);
            const res = await APIGetEpisodeBySeriesId(seriesId);
            dispatch(adminActions.setMovieSeriesEp(res.data));
        } catch (e) {
            console.log(e);
            toast.error(`Some thing when wrong, can not get episode from series id: ${seriesId}, please try again!`)
        } finally {
            setLoadingEp(false);
        }
    };
    const hideDiaglogUpdate = () => {
        setOpenUpdateEp(false);
    };

    const lastItemRef = useCallback(
        (node) => {
            if (loading || isLastPage) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, isLastPage]
    );

    //Chuyển trang xóa redux movie series list
    useEffect(() => {
        return () => {
            // Return a cleanup list redux
            dispatch(adminActions.updateMovieSeries([]))
            dispatch(adminActions.setMovieSeriesEp([]))
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        APIGetMovieSeries(page)
            .then(res => {
                console.log(res)
                if (res.data.length === 0) {
                    setIsLastPage(true)
                } else {
                    const updateMovieSeriesAction = adminActions.addExtraToListMovieSeries(res.data)
                    dispatch(updateMovieSeriesAction)
                }
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            })
    }, [page]);

    return (
        <React.Fragment>
            {selectedEp ? (
                <Dialog
                    key={selectedEp.id}
                    maxWidth="md"
                    fullWidth={true}
                    open={openUpdateEp}
                    onClose={() => {
                        setOpenUpdateEp(false);
                    }}
                >
                    <UpdateEpisode
                        series={selectedViewSeries}
                        hideDiaglogUpdate={hideDiaglogUpdate}
                        key={selectedEp.id}
                        ep={selectedEp}
                    />
                </Dialog>
            ) : null}
            <div className="titleList">List Episodes</div>
            {movieSeries?.map((series, index) => {
                if (movieSeries.length === index + 1) {
                    return (
                        <div key={series.id} className="allEpisodeLine" ref={lastItemRef}>
                            <div className="allEpisodeContent">
                                <figure className="episodeItemImg">
                                    <img src={series.image} alt="img" />
                                </figure>
                                <div className="episodeItemTitle">
                                    {series.name}
                                    <br />
                                </div>
    
                                {selectedViewSeries.id === series.id ? (
                                    <div className="episodeItem">
                                        {episodes?.map((ep, index) => {
                                            return (
                                                <button
                                                    key={ep.id}
                                                    onClick={() => {
                                                        setSelectedEp(ep);
                                                        setOpenUpdateEp(true);
                                                    }}
                                                    className="btn episodeButton"
                                                >
                                                    {ep.numEpisodes}
                                                </button>
                                            );
                                        })}
                                        {loadingEp ? <CircularProgress /> : null}
                                    </div>
                                ) : null}
                                <button
                                    className={
                                        selectedViewSeries.id === series.id
                                            ? "fa fa-eye openEye"
                                            : "fa fa-eye-slash closeEye"
                                    }
                                    onClick={() => {
                                        getEpisodeBySeriesId(series.id);
                                        setSelectedViewSeries(series);
                                    }}
                                ></button>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={series.id} className="allEpisodeLine">
                            <div className="allEpisodeContent">
                                <figure className="episodeItemImg">
                                    <img src={series.image} alt="img" />
                                </figure>
                                <div className="episodeItemTitle">
                                    {series.name}
                                    <br />
                                </div>
    
                                {selectedViewSeries.id === series.id ? (
                                    <div className="episodeItem">
                                        {episodes?.map((ep) => {
                                            return (
                                                <button
                                                    onClick={() => {
                                                        setSelectedEp(ep);
                                                        setOpenUpdateEp(true);
                                                    }}
                                                    className="btn episodeButton"
                                                >
                                                    {ep.numEpisodes}
                                                </button>
                                            );
                                        })}
                                        {loadingEp ? <CircularProgress /> : null}
                                    </div>
                                ) : null}
                                <button
                                    className={
                                        selectedViewSeries.id === series.id
                                            ? "fa fa-eye openEye"
                                            : "fa fa-eye-slash closeEye"
                                    }
                                    onClick={() => {
                                        getEpisodeBySeriesId(series.id);
                                        setSelectedViewSeries(series);
                                    }}
                                ></button>
                            </div>
                        </div>
                    );
                }
            })}
        </React.Fragment>
    );
}
