import React, { useEffect, useState } from "react";
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

export default function ListEpisode() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingEp, setLoadingEp] = useState(false);
    const episodes = useSelector((state) => state.admin.movieSeriesEp);
    const [selectedEp, setSelectedEp] = useState(false);
    const [openUpdateEp, setOpenUpdateEp] = useState(false);
    const [selectedViewSeries, setSelectedViewSeries] = useState(false);
    const movieSeries = useSelector((state) => state.admin.movieSeries);
    const dispatch = useDispatch();
    const loadMovieSeries = async () => {
        try {
            setLoading(true);
            const resGetMovieSeries = await APIGetMovieSeries();
            if (resGetMovieSeries?.status === 200) {
                const updateMovieSeriesAction = adminActions.updateMovieSeries(
                    resGetMovieSeries.data
                );
                dispatch(updateMovieSeriesAction);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const getEpisodeBySeriesId = async (seriesId) => {
        try {
            dispatch(adminActions.setMovieSeriesEp([]));
            setLoadingEp(true);
            const res = await APIGetEpisodeBySeriesId(seriesId);
            dispatch(adminActions.setMovieSeriesEp(res.data));
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingEp(false);
        }
    };
    useEffect(() => {
        loadMovieSeries();
    }, []);
    const hideDiaglogUpdate = () => {
        setOpenUpdateEp(false);
    };
    return (
        <>
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
            {movieSeries?.map((series) => {
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
                                                {ep.title}
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
            })}
        </>
    );
}
