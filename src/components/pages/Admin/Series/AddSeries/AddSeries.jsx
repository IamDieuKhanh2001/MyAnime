import React, { useEffect, useRef, useState } from "react";
import "./AddSeries.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectField from "../CustomSeriesSelect/CustomSeriesSelect";
import { useDispatch, useSelector } from "react-redux";
import { APIAddMovieSeries, APIGetMovie } from "../../../../../api/axios/adminAPI";
import { adminActions } from "../../../../../api/redux/slices/adminSlice";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";
import _ from "lodash";



export default function AddSeries() {
  const [loadingMovies, setLoadingMovies] = useState()
  const [uploadFile, setUploadFile] = useState()
  const [formValues, setFormValues] = useState(null);
  const [previewImg, setPreviewImg] = useState();
  const dispatch = useDispatch()
  const movies = useSelector(state => state.admin.movies)

  const initialValues = {
    name: "",
    movieName: "",
    description: "",
    poster: "",
    totalEp: "",
    dateAired: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(50, "Up to 50 characters").required("Empty"),
    description: Yup.string().required("Empty"),
    poster: Yup.mixed(),
    movieName: Yup.object().required("Empty"),
    totalEp: Yup.string().required("Empty"),
    dateAired: Yup.string().required("Empty"),
  });

  const imageHandler = (e, setFieldValue) => {
    if (e.target.files[0]) {
      setUploadFile(e.target.files[0])
      setFieldValue("avatar", e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = async (fields, resetForm) => {
    try {
      let bodyFormData = new FormData()
      bodyFormData.append('model', JSON.stringify({
        description: fields.description,
        dateAired: fields.dateAired,
        name: fields.name,
        totalEpisode: fields.totalEp,
        movieId: fields.movieName.value
      }))
      bodyFormData.append('sourceFile', uploadFile)
      const resAddMovieSeries = await APIAddMovieSeries(bodyFormData)
      if (resAddMovieSeries.status === 200) {
        const updateMovieSeriesAction = adminActions.addFirstListMovieSeries(resAddMovieSeries.data.data) //add item added in first list
        dispatch(updateMovieSeriesAction)
        toast.success(`Add movie series ${fields.name} success`)
        //Reset new form
        resetForm()
        setPreviewImg(null)
        setUploadFile(null)
      }
    } catch (e) {
      console.log(e)
      toast.error(`Add movie series fail`)
    }
  };

  //Fix for pageable movie later
  const loadMovies = async () => {
    console.log("Calling api get movies")
    setLoadingMovies(true)
    const resGetMovies = await APIGetMovie(1, undefined, 99999);   //Fix for pageable movie later
    if (resGetMovies?.status === 200) {
      const updateMoviesAction = adminActions.updateMovies(resGetMovies.data)
      dispatch(updateMoviesAction);
    }
    setLoadingMovies(false)
  }

  //Chuyển trang xóa redux movie list
  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <div className="addSeries">
      <Formik
        initialValues={initialValues || formValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
        enableReinitialize
      >
        {({ setFieldValue, errors, touched, isSubmitting }) => (
          <Form>
            <div className="container-xl px-4 mt-4">
              <div className="row">
                <div className="col-xl-7">
                  <div className="card mb-4">
                    <div className="card-header">Add Series</div>
                    <div className="card-body">
                      <div className="addForm">
                        <div className="mb-3">
                          <label className="small mb-1" htmlFor="inputName">
                            Series Name
                          </label>
                          <Field
                            className="form-control"
                            id="inputName"
                            type="text"
                            name="name"
                            placeholder="Enter your series name"
                          />
                          <span className="error">
                            {errors.name && touched.name && (
                              <div>{errors.name}</div>
                            )}
                          </span>
                        </div>
                        {
                          loadingMovies ?
                            <LoadingAnimation />
                            : movies ?
                              <div className="mb-3">
                                <label
                                  className="small mb-1"
                                  htmlFor="inputmovieName"
                                >
                                  Movie Name
                                </label>
                                <Field
                                  component={SelectField}
                                  name="movieName"
                                  options={movies.map(movie => {
                                    return ({
                                      value: movie.id,
                                      label: movie.title
                                    })
                                  })}
                                />
                                <span className="error">
                                  {errors.movieName && touched.movieName && (
                                    <div>{errors.movieName}</div>
                                  )}
                                </span>
                              </div> : null
                        }

                        <div className="mb-3">
                          <label className="small mb-1" htmlFor="inputTotalEp">
                            Total Eposide
                          </label>
                          <Field
                            className="form-control"
                            id="inputTotalEp"
                            type="text"
                            name="totalEp"
                            placeholder="Enter your total eposide"
                          />
                          <span className="error">
                            {errors.totalEp && touched.totalEp && (
                              <div>{errors.totalEp}</div>
                            )}
                          </span>
                        </div>
                        <div className="mb-3">
                          <label
                            className="small mb-1"
                            htmlFor="inputDateAired"
                          >
                            Date Aired
                          </label>
                          <Field
                            className="form-control"
                            id="inputDateAired"
                            name="dateAired"
                            placeholder="Enter your date aired"
                            type="date"
                          />
                          <span className="error">
                            {errors.dateAired && touched.dateAired && (
                              <div>{errors.dateAired}</div>
                            )}
                          </span>
                        </div>

                        <div className="mb-3">
                          <label
                            className="small mb-1"
                            htmlFor="inputDescription"
                          >
                            Description
                          </label>
                          <Field
                            className="form-control"
                            id="inputDescription"
                            component="textarea"
                            name="description"
                            placeholder="Enter your description"
                          />
                          <span className="error">
                            {errors.description && touched.description && (
                              <div>{errors.description}</div>
                            )}
                          </span>
                        </div>

                        <button className="btn btn-danger px-4" type="submit">
                          {isSubmitting && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Add series
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
                <div className="col-xl-5">
                  <div className="card mb-4 mb-xl-0">
                    <div className="card-header">Poster</div>
                    <div className="card-body text-center">
                      <img
                        className="img-account-poster mb-2"
                        src={previewImg ? previewImg : "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"}
                        alt="avatar"
                        id="img"
                      />
                      <div className="small font-italic text-muted mb-4">
                        JPG or PNG no larger than 5 MB
                      </div>
                      <label
                        htmlFor="input"
                        className="btn btn-danger custom-file-upload"
                      >
                        Upload
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="imageBtn"
                        id="input"
                        onChange={(e) => imageHandler(e, setFieldValue)}
                      />
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
