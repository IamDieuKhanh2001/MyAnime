import Select from "react-select";
import { useField } from "formik";
import React, { useEffect } from "react";
import { adminActions } from "../../../../../api/redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
export default function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);
  const dispatch = useDispatch()
  let isIsUpdateMovie = useSelector(state => state.admin.isUpdateMovie)
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: "#000",
      padding: 20,
    }),
  }
  const onChange = (value) => {
    console.log(value.length)
    if (value?.length > 3) {                           //Nếu category chọn quá 3 sẽ không thể add hoặc update
      if (isIsUpdateMovie) {                           //Kiểm tra đang trạng thái update hay add movie
        dispatch(adminActions.setInvalidUpdateMovie(true)) //setInvalidUpdateMovie true sẽ không add được movie
      } else {
        dispatch(adminActions.setInvalidAddMovie(true)) 
      }
    } else {
      if (isIsUpdateMovie) {
        dispatch(adminActions.setInvalidUpdateMovie(false))
      } else {
        dispatch(adminActions.setInvalidAddMovie(false))
      }
    }
    setValue(value);
  };
  useEffect(() => {
    console.log(field)
    console.log(state)
  }, [])

  return (
    <Select
      {...props}
      styles={customStyles}
      value={state?.value}
      isMulti
      onChange={onChange}
      onBlur={setTouched}
    />
  );
}
