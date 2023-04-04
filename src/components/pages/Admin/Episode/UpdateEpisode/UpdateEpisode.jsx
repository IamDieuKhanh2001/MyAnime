import React, { useState } from "react";
import "./UpdateEpisode.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectField from "../CustomEpisodeSelect/CustomEpisodeSelect";
import { useDispatch, useSelector } from "react-redux";
import {
    APIDeleteEpisode,
    APIGetEpisodeBySeriesId,
    APIUpdateEpisode,
} from "../../../../../api/axios/adminAPI";
import { toast } from "react-toastify";
import { adminActions } from "../../../../../api/redux/slices/adminSlice";
import ServerAssetsSelect from "../CustomServerSelect/CustomServerSelect";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import PremiumPopover from "../PremiumPopover/PremiumPopover";

export default function UpdateEpisode({ series, ep, hideDiaglogUpdate }) {
    const [formValues, setFormValues] = useState(null);
    const [previewImg, setPreviewImg] = useState();
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadServerList, setLoadServerList] = useState(false);
    const dispatch = useDispatch();
    const movieSeries = useSelector((state) => state.admin.movieSeries);

    const serversAssets = [
        { name: "Digital Ocean", id: "do" },
        { name: "Cloudinary", id: "cd" },
    ];

    const serversAssetsSelected = [
        // { label: "Cloudinary", value: "cd" },
    ];

    const initialValues = {
        numEpisode: ep.numEpisodes,
        episodeName: ep.title,
        seriesName: series.name,
        video: "",
        serversAssets: [],
        isPremium: ep.premiumRequired,
    };
    if (ep.resourceDO !== null) {
        serversAssetsSelected.push({ label: "Digital Ocean", value: "do" })
    }
    if (ep.resourceCD !== null) {
        serversAssetsSelected.push({ label: "Cloudinary", value: "cd" })
    }
    console.log(ep)
    const validationSchema = Yup.object().shape({
        numEpisode: Yup.number().default(-1).required("Number episode must be a number"), //Number episode <= 0 server will auto numbering
        episodeName: Yup.string().required("Empty"),
        video: Yup.mixed(),
    });
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
    const onDeleteEpisode = async () => {
        try {
            setLoadingDelete(true);
            const res = await APIDeleteEpisode(ep.id);
            await getEpisodeBySeriesId(series.id);
            toast.success("Delete episode success");
            hideDiaglogUpdate();
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingDelete(false);
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
            console.log(bodyFormData);
            const res = await APIUpdateEpisode(ep.id, bodyFormData);
            if (res.status === 200) {
                await getEpisodeBySeriesId(series.id);
                toast.success(`Update episode success`);
                console.log(res.data);
                resetForm();
                setPreviewImg(null);
            }
            hideDiaglogUpdate();
        } catch (e) {
            console.log(e);
            toast.error("Update episode fail");
        }
    };
    const getEpisodeBySeriesId = async (seriesId) => {
        try {
            dispatch(adminActions.setMovieSeriesEp([]));
            const res = await APIGetEpisodeBySeriesId(seriesId);
            dispatch(adminActions.setMovieSeriesEp(res.data));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="updateEpisodes">
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
                        <div className=" updateEpisodesForm container-xl px-4 mt-4">
                            <div className="row">
                                <div className="col-xl-7">
                                    <div className="card mb-4">
                                        <div
                                            className="card-header"
                                            style={{ color: "red" }}
                                        >
                                            Update Episode
                                        </div>
                                        <div className="card mb-4 mb-xl-0">
                                            <div className="card-body">
                                                {previewImg ? (
                                                    <video
                                                        key={previewImg}
                                                        id="updateVideo"
                                                        width="400"
                                                        controls
                                                    >
                                                        <source
                                                            src={previewImg}
                                                        />
                                                    </video>
                                                ) : null}
                                                {!previewImg && ep.resource ? (
                                                    <video width="400" controls>
                                                        <source
                                                            src={ep.resource}
                                                        />
                                                    </video>
                                                ) : null}
                                                {!previewImg && !ep.resource ? (
                                                    <img
                                                        className="img-video mb-2"
                                                        src={
                                                            "https://cdn.pixabay.com/photo/2015/09/15/17/18/vector-video-player-941434_1280.png"
                                                        }
                                                        alt="video"
                                                        id="img"
                                                    />
                                                ) : null}
                                                <div className="small font-italic text-muted mb-4">
                                                    Upload new video (or else skip this)
                                                </div>
                                                <label
                                                    htmlFor="inputUpdateVideoEp"
                                                    className="btn btn-danger custom-file-upload"
                                                >
                                                    Upload
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="video/mp4,video/x-m4v,video/*"
                                                    className="imageBtn"
                                                    id="inputUpdateVideoEp"
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
                                                        htmlFor="inputNumberEpisode"
                                                    >
                                                        Number episode
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputNumberEpisode"
                                                        type="text"
                                                        name="numEpisode"
                                                        placeholder="Enter your number episode"
                                                    />
                                                    <span className="error">
                                                        {errors.numberEpisode &&
                                                            touched.numberEpisode && (
                                                                <div>
                                                                    {
                                                                        errors.numberEpisode
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                    <label
                                                        className="small mb-1"
                                                        htmlFor="inputEpisodeName"
                                                    >
                                                        Episode name
                                                    </label>
                                                    <Field
                                                        className="form-control"
                                                        id="inputEpisodeName"
                                                        type="text"
                                                        name="episodeName"
                                                        placeholder="Enter your episode title"
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
                                                        className="small mb-1"
                                                        htmlFor="inputseriesName"
                                                    >
                                                        Series Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="seriesName"
                                                        disabled={true}
                                                        className="form-control"
                                                        options={movieSeries?.map(
                                                            (series) => {
                                                                return {
                                                                    value: series.id,
                                                                    label: series.name,
                                                                };
                                                            }
                                                        )}
                                                    />
                                                </div>
                                                <div className="mb-3 d-flex justify-content-between">
                                                    <div>
                                                        <label
                                                            className="large mb-1"
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
                                                        Server Backup
                                                    </label>
                                                    {loadServerList ? (
                                                        <LoadingAnimation />
                                                    ) : serversAssets ? (
                                                        <Field
                                                            component={
                                                                ServerAssetsSelect
                                                            }
                                                            currentValue={serversAssetsSelected}
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
                                                    className="btn btn-danger px-4"
                                                    type="submit"
                                                >
                                                    {isSubmitting && (
                                                        <span
                                                            style={{
                                                                margin: 3,
                                                            }}
                                                            className="spinner-border spinner-border-sm mr-1"
                                                        ></span>
                                                    )}
                                                    <i className="bx bx-check mr-1"></i>
                                                    Update
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-warning px-4 ml-2"
                                                    onClick={() => {
                                                        onDeleteEpisode();
                                                    }}
                                                >
                                                    {loadingDelete && (
                                                        <span
                                                            style={{
                                                                margin: 3,
                                                            }}
                                                            className="spinner-border spinner-border-sm mr-1"
                                                        ></span>
                                                    )}
                                                    <i className="bx bx-trash mr-1"></i>
                                                    Delete
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
