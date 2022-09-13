import Select from "react-select";
import { useField } from "formik";
import React from "react";
export default function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Select
      {...props}
      value={state?.value}
      onChange={onChange}
      onBlur={setTouched}
    />
  );
}
