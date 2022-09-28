import React, { useState } from "react";
import "./UpdateEpisode.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectField from "../CustomEpisodeSelect/CustomEpisodeSelect";

export default function UpdateEpisode() {
    const [formValues, setFormValues] = useState(null);
    const [previewImg, setPreviewImg] = useState();
    const initialValues = {
        episode: "",
        seriesName: "",
        video: "",
    };

    const validationSchema = Yup.object().shape({
        episode: Yup.string().required("Empty"),
        seriesName: Yup.object().required("Empty"),
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

    return  <div className="updateEpisodes">
    <Formik
      initialValues={initialValues || formValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ setFieldValue, errors, touched, isSubmitting }) => (
         <Form>
         <div className=" updateEpisodesForm container-xl px-4 mt-4">
             <div className="row">
                 <div className="col-xl-7">
                     <div className="card mb-4">
                         <div className="card-header" style={{color:"red"}}>
                             Update Episode
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

                                 <div className="mb-3">
                                     <label
                                         className="small mb-1"
                                         htmlFor="inputseriesName"
                                     >
                                         Series Name
                                     </label>
                                     <Field
                                         component={SelectField}
                                         name="seriesName"
                                         options={""}
                                     />
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
                                 <button
                                     className="btn btn-danger px-4"
                                     type="submit"
                                 >
                                     {isSubmitting && (
                                         <span className="spinner-border spinner-border-sm mr-1"></span>
                                     )}
                                     <i className="bx bx-check mr-1"></i>Update
                                 </button>
                                 <button className="btn btn-warning px-4 ml-2"
                                     type="submit"><i className="bx bx-trash mr-1"></i>Delete</button>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </Form>
      )}
    </Formik>
  </div>;
}
