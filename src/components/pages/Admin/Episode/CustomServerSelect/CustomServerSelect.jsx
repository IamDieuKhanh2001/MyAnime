import Select from "react-select";
import { useField } from "formik";
import React, { useEffect } from "react";
import { adminActions } from "../../../../../api/redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ServerAssetsSelect(props) {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);
    const dispatch = useDispatch()
    let isIsUpdateEpisode = useSelector(state => state.admin.isUpdateEpisode)
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: "#000",
            padding: 20,
        }),
    }
    const onChange = (value) => {
        console.log(value)
        if (value?.length > 2 || value?.length === 0) {
            if (isIsUpdateEpisode) {
                dispatch(adminActions.setInvalidUpdateEpisode(true))
            } else {
                dispatch(adminActions.setInvalidAddEpisode(true))
            }
        } else {
            if (isIsUpdateEpisode) {
                dispatch(adminActions.setInvalidUpdateEpisode(false))
            } else {
                dispatch(adminActions.setInvalidAddEpisode(false))
            }
        }
        setValue(value);
    };
    useEffect(() => {
        console.log(field)
        console.log(state)
        setValue(props.currentValue)
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
