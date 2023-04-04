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
        numEpisode: "",
        episodeName: "",
        seriesName: "",
        video: "",
        serverAssets: [],
        isPremium: false,
    };
    const movieSeries = useSelector((state) => state.admin.movieSeries);
    const validationSchema = Yup.object().shape({
        numEpisode: Yup.number().default(-1).required("Number episode must be a number"), //Number episode <= 0 server will auto numbering
        episodeName: Yup.string().required("Episode name can not be empty"),
        seriesName: Yup.object().required("Series name can not be empty"),
        video: Yup.mixed().required("Empty video file"),
        serverAssets: Yup.array().min(1, "Server must be at least 1").required("Choose your assets server"),
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
            console.log(serverList)
            let bodyFormData = new FormData();
            bodyFormData.append(
                "model",
                JSON.stringify({
                    title: fields.episodeName,
                    premiumRequired: fields.isPremium,
                    numEpisodes: fields.numEpisode,
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
                console.log(res.data);
                resetForm();
                setPreviewImg(null);
                setUploadFile(null);
            }
        } catch (e) {
            toast.error(`Something when wrong, please try again`);
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
                                                    <div className="alert alert-warning" role="alert">
                                                        <h4 className="alert-heading">Choose your video file !!</h4>
                                                        <p>you haven't uploaded a video yet.</p>
                                                        <hr />
                                                        <p className="mb-0">File must be video/mp4,video/x-m4v,video/* format.</p>
                                                    </div>
                                                )}
                                                <div className="mb-3">
                                                    <span className="error">
                                                        {errors.video && (
                                                            <div>
                                                                {
                                                                    errors.video
                                                                }
                                                            </div>
                                                        )}
                                                    </span>
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
                                                        className="medium mb-1"
                                                        htmlFor="inputNumberEpisode"
                                                    >
                                                        Number episode
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputNumberEpisode"
                                                        type="text"
                                                        name="numEpisode"
                                                        placeholder="Enter your episode name (Blank will auto numbering)"
                                                    />
                                                    <span className="error">
                                                        {errors.numEpisode &&
                                                            touched.numEpisode && (
                                                                <div>
                                                                    {
                                                                        errors.numEpisode
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="medium mb-1"
                                                        htmlFor="inputNameEpisode"
                                                    >
                                                        Episode name
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputNameEpisode"
                                                        type="text"
                                                        name="episodeName"
                                                        placeholder="Enter your episode name"
                                                    />
                                                    <span className="error">
                                                        {errors.episodeName &&
                                                            touched.episodeName && (
                                                                <div>
                                                                    {
                                                                        errors.episodeName
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="medium mb-1"
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
                                                            className="medium mb-1"
                                                            htmlFor="inputPremiumEpisode"
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
                                                        Server assets
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
                                                {isSubmitting && (
                                                    <div className="alert alert-success mt-3" role="alert">
                                                        <h4 className="alert-heading">
                                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                                            Uploading!! please wait
                                                        </h4>
                                                    </div>
                                                )}
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
