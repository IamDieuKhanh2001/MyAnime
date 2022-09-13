import React, { useState } from "react";
import "./AddMovie.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectField from "./../CustomSelect/CustomSelect";

const options = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "thriller", label: "Thriller" },
  { value: "adventure", label: "Adventure" },
  { value: "horror", label: "Horror" },
  { value: "romantic", label: "Romantic" },
  { value: "animation", label: "Animation" },
];

export default function AddMovie() {
  const [formValues, setFormValues] = useState(null);

  const initialValues = {
    name: "",
    studioName: "",
    category: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(50, "Up to 50 characters").required("Empty"),
    studioName: Yup.string().max(50, "Up to 50 characters").required("Empty"),
  });

  const onSubmit = async (fields) => {
    console.log(fields);
  };

  return (
    <div className="addMovie">
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
                    <div className="card-header">Add Movie</div>
                    <div className="card-body">
                      <div className="addForm">
                        <div className="mb-3">
                          <label className="small mb-1" htmlFor="inputName">
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
                            {errors.name && touched.name && (
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
                            {errors.studioName && touched.studioName && (
                              <div>{errors.studioName}</div>
                            )}
                          </span>
                        </div>

                        <div className="mb-3">
                          <label className="small mb-1" htmlFor="inputCategory">
                            Category
                          </label>

                          <Field
                            component={SelectField}
                            name="category"
                            options={options}
                          />
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
