import React, { useEffect, useState } from "react";
import "./AddSeries.scss";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PuffLoader } from "react-spinners/PuffLoader";

export default function AddSeries() {
  const [previewImg, setPreviewImg] = useState(
    "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"
  );

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
    movieName: Yup.string().max(50, "Up to 50 characters").required("Empty"),
    description: Yup.string().required("Empty"),
    poster: Yup.mixed(),
    totalEp: Yup.string().required("Empty"),
    dateAired: Yup.string().required("Empty"),
  });

  const imageHandler = (e, setFieldValue) => {
    if (e.target.files[0]) {
      setFieldValue("avatar", e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = async (fields) => {
    console.log(fields);
  };

  return (
    <div className="addSeries">
      <Formik
        initialValues={initialValues}
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
                        <div className="mb-3">
                          <label
                            className="small mb-1"
                            htmlFor="inputmovieName"
                          >
                            Movie Name
                          </label>
                          <Field
                            className="form-control"
                            id="inputmovieName"
                            type="text"
                            name="movieName"
                            placeholder="Enter your movie name"
                          />
                          {/* <option value="">Action</option> */}
                          {/* {genresList &&
                            genresList.map((data, index) => (
                              <option value={data.id} key={index}>
                                {data.name}
                              </option>
                            ))} */}
                          <span className="error">
                            {errors.movieName && touched.movieName && (
                              <div>{errors.movieName}</div>
                            )}
                          </span>
                        </div>
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
                          Add
                        </button>
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
                        src={previewImg}
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
