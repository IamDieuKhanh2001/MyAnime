import React, { useEffect, useState } from "react";
import "./UpdateMovie.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectField from "./../CustomSelect/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import {
    APIAddMovie,
    APIGetMovieCategories,
    APIUpdateMovie,
} from "../../../../../api/axios/adminAPI";
import { toast } from "react-toastify";
import { adminActions } from "../../../../../api/redux/slices/adminSlice";
import _ from "lodash";
import { Dialog } from "@mui/material";

export default function UpdateMovie({ movie, hideDiaglogUpdate }) {
    const [loadCategory, setLoadCategory] = useState();
    const [formValues, setFormValues] = useState(null);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.admin.movieCategories);
    const isShowModalUpdateMovie = useSelector(
        (state) => state.admin.isShowModalUpdateMovie
    );
    let isInvalidUpdateMovie = useSelector(
        (state) => state.admin.isInvalidUpdateMovie
    );
    let movies = useSelector((state) => state.admin.movies);
    const initialValues = {
        name: movie?.title,
        studioName: movie?.studioName,
        category: movie?.categoryData?.map((category) => {
            return {
                value: category.id,
                label: category.name,
            };
        }),
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(50, "Up to 50 characters").required("Empty"),
        studioName: Yup.string()
            .max(50, "Up to 50 characters")
            .required("Empty"),
        //category: Yup.array().max(3, "Max category is 3").required("Empty")
    });

    const onSubmit = async (fields) => {
        try {
            const resUpdate = await APIUpdateMovie({
                title: fields.name,
                studioName: fields.studioName,
                id: movie.id,
            });
            if (resUpdate?.status === 200) {
                console.log(resUpdate);
                const updatedMovie = resUpdate.data.data;
                let index = _.findIndex(movies, { id: movie.id });
                let temp = [...movies];
                temp[index] = updatedMovie;
                const updateMoviesAction = adminActions.updateMovies(temp);
                dispatch(updateMoviesAction);
                toast.success(`Update movie success`);
                hideDiaglogUpdate();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const loadCategories = async () => {
        setLoadCategory(true);
        const resGetCategory = await APIGetMovieCategories();
        if (resGetCategory?.status === 200) {
            const updateMovieCategoriesAction =
                adminActions.updateMovieCategories(resGetCategory.data);
            dispatch(updateMovieCategoriesAction);
        }
        setLoadCategory(false);
    };
    useEffect(() => {
        loadCategories();
        dispatch(adminActions.setIsUpdateMovie(true));
        return () => {
            dispatch(adminActions.setIsUpdateMovie(false));
        };
    }, []);
    const handleClose = () => {
        dispatch(adminActions.setShowModalUpdateMovie(false));
    };
    return (
        <>
            <div className="updateMovie">
                <Formik
                    initialValues={initialValues || formValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ setFieldValue, errors, touched, isSubmitting }) => (
                        <Form>
                            <div className="updateMovieForm">
                                <div style={{ color: "red" }}>Update Movie</div>
                                <div className="card-body">
                                    <div className="addForm">
                                        <div className="mb-3">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputName"
                                            >
                                                Movie Name
                                            </label>
                                            <Field
                                                className="form-control"
                                                id="inputName"
                                                type="text"
                                                name="name"
                                                placeholder="Enter your movie name"
                                            />
                                            <span className="error">
                                                {errors.name &&
                                                    touched.name && (
                                                        <div>{errors.name}</div>
                                                    )}
                                            </span>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputstudioName"
                                            >
                                                Studio Name
                                            </label>
                                            <Field
                                                className="form-control"
                                                id="inputstudioName"
                                                type="text"
                                                name="studioName"
                                                placeholder="Enter your studio name"
                                            />
                                            <span className="error">
                                                {errors.studioName &&
                                                    touched.studioName && (
                                                        <div>
                                                            {errors.studioName}
                                                        </div>
                                                    )}
                                            </span>
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputCategory"
                                            >
                                                Category
                                            </label>
                                            {loadCategory ? (
                                                <LoadingAnimation />
                                            ) : categories ? (
                                                <Field
                                                    component={SelectField}
                                                    name="category"
                                                    options={categories.map(
                                                        (category) => {
                                                            return {
                                                                value: category.id,
                                                                label: category.name,
                                                            };
                                                        }
                                                    )}
                                                />
                                            ) : null}
                                            <span className="error">
                                                {errors.category &&
                                                    touched.category && (
                                                        <div
                                                            style={{
                                                                marginTop: 10,
                                                            }}
                                                        >
                                                            {errors.category}
                                                        </div>
                                                    )}
                                            </span>
                                        </div>

                                        <button
                                            disabled={isInvalidUpdateMovie}
                                            className="btn btn-danger px-4"
                                            type="submit"
                                        >
                                            {isSubmitting && (
                                                <span className="spinner-border spinner-border-sm mr-1"></span>
                                            )}
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
