import React, { useEffect, useState } from "react";
import "./UpdateSeries.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectField from "../CustomSeriesSelect/CustomSeriesSelect";
import { useDispatch, useSelector } from "react-redux";
import { APIAddMovieSeries, APIGetMovie, APIUpdateMovie, APIUpdateMovieSeries } from "../../../../../api/axios/adminAPI";
import { adminActions } from "../../../../../api/redux/slices/adminSlice";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";
import _ from "lodash";



export default function UpdateSeries({series,hideDiaglogUpdate}) {
  const [uploadFile, setUploadFile] = useState()
  const [formValues, setFormValues] = useState(null);
  const [previewImg, setPreviewImg] = useState();
  const dispatch = useDispatch()

  const initialValues = {
    name: series?.name,
    description: series?.description,
    poster: "",
    movie: series?.movieData?.title,
    totalEp: series?.totalEpisode,
    dateAired: series.dateAired.split('T')[0]
  };
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(50, "Up to 50 characters").required("Empty"),
    description: Yup.string().required("Empty"),
    poster: Yup.mixed(),
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

  const onSubmit = async (fields) => {
    try{
      let bodyFormData = new FormData()
      bodyFormData.append('model', JSON.stringify({
        description: fields.description,
        dateAired: fields.dateAired.split('T')[0],
        name: fields.name,
        totalEpisode: fields.totalEp,
      }))
      bodyFormData.append('sourceFile', uploadFile)
      const resUpdateMovieSeries = await APIUpdateMovieSeries(series.id,bodyFormData)
      console.log(resUpdateMovieSeries)
      if(resUpdateMovieSeries.status===200){
        const updateSeries = resUpdateMovieSeries.data.data
        const updateMovieSeriesAction = adminActions.replaceItemInListMovieSeries(updateSeries) //Update redux
        dispatch(updateMovieSeriesAction)
        toast.success(`Update movie series ${fields.name} success`)
        hideDiaglogUpdate()
      }
    }catch(e){
      toast.error(`Update movie series fail`)
    }
  };

  useEffect(() => {
    setPreviewImg(series?.image)
  }, [])


  return (
    <div className="updateSeries">
      <Formik
        initialValues={initialValues || formValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ setFieldValue, errors, touched, isSubmitting }) => (
          <Form>
            <div className="updateMovieSeriesForm container-xl px-4 mt-4">
              <div className="row">
                <div className="col-xl-7">
                  <div className="card mb-4">
                    <div style={{color:"red"}}>Update Series</div>
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
                          <label className="small mb-1" htmlFor="inputName">
                            Movie Name
                          </label>
                          <Field
                            className="form-control"
                            id="inputName"
                            type="text"
                            name="movie"
                            disabled  
                          />
                          <span className="error">
                            {errors.name && touched.name && (
                              <div>{errors.name}</div>
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
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5">
                <div className="card-body text-center">
                      <img
                        className="img-account-poster mb-2"
                        src={previewImg?previewImg:"https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"}
                        alt="avatar"
                        id="imgUpdate"
                      />
                      <div className="small font-italic text-muted mb-4">
                        JPG or PNG no larger than 5 MB
                      </div>
                      <label
                        htmlFor="inputUpdate"
                        className="btn btn-danger custom-file-upload"
                      >
                        Upload
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="imageBtn"
                        id="inputUpdate"
                        onChange={(e) => imageHandler(e, setFieldValue)}
                      />
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
