import Select from "react-select";
import { useField } from "formik";
import React from "react";
export default function SelectSubscriptionPackageDropdown(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: "#000",
      padding: 20,
    }),
  }
  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Select
      {...props}
      styles={customStyles}
      value={state?.value}
      onChange={onChange}
      onBlur={setTouched}
    />
  );
}
