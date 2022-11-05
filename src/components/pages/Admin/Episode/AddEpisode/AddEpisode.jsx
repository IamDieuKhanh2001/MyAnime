import React, { useEffect, useState } from "react";
import "./AddEpisode.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import SelectField from "../CustomEpisodeSelect/CustomEpisodeSelect";
import {
    APIAddEpisode,
    APIGetEpisodeBySeriesId,
    APIGetMovieSeries,
} from "../../../../../api/axios/adminAPI";
import { adminActions } from "../../../../../api/redux/slices/adminSlice";
import { toast } from "react-toastify";
import ServerAssetsSelect from "../CustomServerSelect/CustomServerSelect";
import PremiumPopover from "../PremiumPopover/PremiumPopover";

export default function AddEpisode() {
    const [previewImg, setPreviewImg] = useState();
    const [uploadFile, setUploadFile] = useState();
    const [formValues, setFormValues] = useState(null);
    const [loading, setLoading] = useState();
    const [loadServerList, setLoadServerList] = useState(false);
    const dispatch = useDispatch();
    let isInvalidAddEpisode = useSelector(
        (state) => state.admin.isInvalidAddEpisode
    );

    const serversAssets = [
        { name: "Digital Ocean", id: "do" },
        { name: "Cloudinary", id: "cd" },
    ];

    const initialValues = {
        episode: "",
        seriesName: "",
        video: "",
        serverAssets: [],
        isPremium: false,
    };
    const movieSeries = useSelector((state) => state.admin.movieSeries);
    const validationSchema = Yup.object().shape({
        episode: Yup.string().required("Empty"),
        seriesName: Yup.object().required("Empty"),
        video: Yup.mixed().required("Empty"),
        serverAssets: Yup.array().min(1, "Server must be at least 1").required("Empty"),
    });
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

    const imageHandler = (e, setFieldValue) => {
        if (e.target.files[0]) {
            setFieldValue("video", e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setPreviewImg(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    useEffect(() => {
        loadMovieSeries();
    }, []);
    const getEpisodeBySeriesId = async (seriesId) => {
        try {
            dispatch(adminActions.setMovieSeriesEp([]));
            const res = await APIGetEpisodeBySeriesId(seriesId);
            dispatch(adminActions.setMovieSeriesEp(res.data));
        } catch (e) {
            console.log(e);
        }
    };
    const onSubmit = async (fields, resetForm) => {
        try {
            const serverList = [];
            fields.serverAssets.map((s) => serverList.push(s.value));
            let bodyFormData = new FormData();
            bodyFormData.append(
                "model",
                JSON.stringify({
                    title: fields.episode,
                    premiumRequired: fields.isPremium,
                })
            );
            bodyFormData.append("sourceFile", fields.video);
            bodyFormData.append(
                "servers",
                serverList
            );
            const res = await APIAddEpisode(
                fields.seriesName.value,
                bodyFormData
            );
            if (res.status === 200) {
                await getEpisodeBySeriesId(fields.seriesName.value);
                toast.success(`Add episode success`);
                // movieSeries=_.concat(movieSeries,res.data.data)
                // dispatch(adminActions.updateMovieSeries(movieSeries));
                console.log(res.data);
                resetForm();
                setPreviewImg(null);
                setUploadFile(null);
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="addEpisode">
            <Formik
                initialValues={initialValues || formValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) =>
                    onSubmit(values, resetForm)
                }
                enableReinitialize
            >
                {({ setFieldValue, errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="container-xl px-4 mt-4">
                            <div className="row">
                                <div className="col-xl-7">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            Add Episode
                                        </div>
                                        <div className="card mb-4 mb-xl-0">
                                            <div className="card-body">
                                                {previewImg ? (
                                                    <video width="400" controls>
                                                        <source
                                                            src={previewImg}
                                                        />
                                                    </video>
                                                ) : (
                                                    <img
                                                        className="img-video mb-2"
                                                        src={
                                                            "https://cdn.pixabay.com/photo/2015/09/15/17/18/vector-video-player-941434_1280.png"
                                                        }
                                                        alt="video"
                                                        id="img"
                                                    />
                                                )}
                                                <span className="error">
                                                    {errors.video &&
                                                        touched.video && (
                                                            <div>
                                                                {errors.video}
                                                            </div>
                                                        )}
                                                </span>
                                                <div className="small font-italic text-muted mb-4">
                                                    Cloudinary server Mp4 no larger than 15mb
                                                </div>

                                                <label
                                                    htmlFor="input"
                                                    className="btn btn-danger custom-file-upload"
                                                >
                                                    Upload
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="video/mp4,video/x-m4v,video/*"
                                                    className="imageBtn"
                                                    id="input"
                                                    onChange={(e) =>
                                                        imageHandler(
                                                            e,
                                                            setFieldValue
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="addForm">
                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputEpisode"
                                                    >
                                                        Episode
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputEpisode"
                                                        type="text"
                                                        name="episode"
                                                        placeholder="Enter your episode"
                                                    />
                                                    <span className="error">
                                                        {errors.episode &&
                                                            touched.episode && (
                                                                <div>
                                                                    {
                                                                        errors.episode
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputseriesName"
                                                    >
                                                        Series Name
                                                    </label>
                                                    {loading ? (
                                                        <LoadingAnimation />
                                                    ) : (
                                                        <Field
                                                            component={
                                                                SelectField
                                                            }
                                                            name="seriesName"
                                                            options={movieSeries?.map(
                                                                (series) => {
                                                                    return {
                                                                        value: series.id,
                                                                        label: series.name,
                                                                    };
                                                                }
                                                            )}
                                                        />
                                                    )}
                                                    <span className="error">
                                                        {errors.seriesName &&
                                                            touched.seriesName && (
                                                                <div>
                                                                    {
                                                                        errors.seriesName
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <div className="mb-3 d-flex justify-content-between">
                                                    <div>
                                                        <label
                                                            className="large mb-1"
                                                            htmlFor="inputEpisode"
                                                        >
                                                            For premium member only:
                                                        </label>
                                                        <Field
                                                            className="premium-checkbox"
                                                            type="checkbox"
                                                            name="isPremium"
                                                        />
                                                    </div>
                                                    <PremiumPopover />
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputServerAssets"
                                                    >
                                                        Server Backup
                                                    </label>
                                                    {loadServerList ? (
                                                        <LoadingAnimation />
                                                    ) : serversAssets ? (
                                                        <Field
                                                            component={
                                                                ServerAssetsSelect
                                                            }
                                                            name="serverAssets"
                                                            options={serversAssets?.map(
                                                                (server) => {
                                                                    return {
                                                                        value: server.id,
                                                                        label: server.name,
                                                                    };
                                                                }
                                                            )}
                                                        />
                                                    ) : null}
                                                    <span className="error">
                                                        {errors.serverAssets &&
                                                            touched.serverAssets && (
                                                                <div
                                                                    style={{
                                                                        marginTop: 10,
                                                                    }}
                                                                >
                                                                    {
                                                                        errors.serverAssets
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>
                                                <button
                                                    disabled={isInvalidAddEpisode}
                                                    className="btn btn-danger px-4"
                                                    type="submit"
                                                >
                                                    {isSubmitting && (
                                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                                    )}
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
