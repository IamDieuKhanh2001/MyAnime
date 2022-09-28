import React, { useState } from "react";
import "./AddEpisode.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import SelectField from "../CustomEpisodeSelect/CustomEpisodeSelect";

export default function AddEpisode() {
    const [previewImg, setPreviewImg] = useState();
    const [formValues, setFormValues] = useState(null);
    const [loadingMovies, setLoadingMovies] = useState();
    const movies = useSelector((state) => state.admin.movies);
    const initialValues = {
        episode: "",
        movieName: "",
        video: "",
    };

    const validationSchema = Yup.object().shape({
        episode: Yup.string().required("Empty"),
        movieName: Yup.object().required("Empty"),
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

    const onSubmit = async (fields, resetForm) => {};
    return (
        <div className="addEpisode">
            <Formik
                initialValues={initialValues || formValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
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
                                                <img
                                                    className="img-video mb-2"
                                                    src={
                                                        previewImg
                                                            ? previewImg
                                                            : "https://cdn.pixabay.com/photo/2015/09/15/17/18/vector-video-player-941434_1280.png"
                                                    }
                                                    alt="video"
                                                    id="img"
                                                />
                                                <div className="small font-italic text-muted mb-4">
                                                    MP4 no larger than 15 MB
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
                                                {loadingMovies ? (
                                                    <LoadingAnimation />
                                                ) : movies ? (
                                                    <div className="mb-3">
                                                        <label
                                                            className="small mb-1"
                                                            htmlFor="inputmovieName"
                                                        >
                                                            Movie Name
                                                        </label>

                                                        <Field
                                                            component={
                                                                SelectField
                                                            }
                                                            name="movieName"
                                                            options={movies.map(
                                                                (movie) => {
                                                                    return {
                                                                        value: movie.id,
                                                                        label: movie.title,
                                                                    };
                                                                }
                                                            )}
                                                        />
                                                        <span className="error">
                                                            {errors.movieName &&
                                                                touched.movieName && (
                                                                    <div>
                                                                        {
                                                                            errors.movieName
                                                                        }
                                                                    </div>
                                                                )}
                                                        </span>
                                                    </div>
                                                ) : null}

                                                <button
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
