import React, { useEffect, useState } from "react";
import "./AddMovie.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectField from "./../CustomSelect/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import {
    APIAddCategoryMovie,
    APIAddMovie,
    APIAddMovieCategories,
    APIGetMovie,
    APIGetMovieById,
    APIGetMovieCategories,
} from "../../../../../api/axios/adminAPI";
import { toast } from "react-toastify";
import { adminActions } from "../../../../../api/redux/slices/adminSlice";
import _ from "lodash";

export default function AddMovie() {
    const [loadCategory, setLoadCategory] = useState();
    const [formValues, setFormValues] = useState(null);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.admin.movieCategories);
    let isInvalidAddMovie = useSelector(
        (state) => state.admin.isInvalidAddMovie
    );
    const initialValues = {
        name: "",
        studioName: "",
        category: [],
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(50, "Up to 50 characters").required("Empty"),
        studioName: Yup.string()
            .max(50, "Up to 50 characters")
            .required("Empty"),
        category: Yup.array().max(3, "Max category is 3").required("Empty"),
    });

    const onSubmit = async (fields, resetForm) => {
        try {
            const categoryArray = [];
            fields.category.map((c) => categoryArray.push(c.value));
            const resAddMovie = await APIAddMovie({
                title: fields.name,
                studioName: fields.studioName,
            });
            if (resAddMovie?.status === 200) {
                const resAddCategory = await APIAddMovieCategories(
                    resAddMovie.data.data.id,
                    categoryArray
                );
                getAfterAddedMovieById(resAddMovie.data.data.id)
                toast.success(`Add movie ${fields.name} success`);
                resetForm();
            }
        } catch (e) {
            console.log(e);
            toast.error(`Add movie fail`);
        }
    };

    const getAfterAddedMovieById = (id) => {
        APIGetMovieById(id)
            .then(res => {
                const updateMoviesAction = adminActions.addFirstListMovies(res.data)
                dispatch(updateMoviesAction)
            })
            .catch((err) => {
                toast.error(`Add movie fail`);
                console.log(err)
            })
    }
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
    }, []);

    return (
        <div className="addMovie">
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
                                            Add Movie
                                        </div>
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
                                                                <div>
                                                                    {
                                                                        errors.name
                                                                    }
                                                                </div>
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
                                                                    {
                                                                        errors.studioName
                                                                    }
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
                                                            component={
                                                                SelectField
                                                            }
                                                            name="category"
                                                            options={categories?.map(
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
                                                                    {
                                                                        errors.category
                                                                    }
                                                                </div>
                                                            )}
                                                    </span>
                                                </div>
                                                <button
                                                    disabled={isInvalidAddMovie}
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
                                                            adding!! please wait
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
