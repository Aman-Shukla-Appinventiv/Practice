import React, { useState, forwardRef, useImperativeHandle } from "react";
import { TextInput } from "react-native"

const Input = forwardRef((props, ref) => {
  const [ data, setData ] = useState('')
    const getData = () => data
    const handleTextChange = ( text ) => {setData(text)}
    useImperativeHandle(ref, () => {
        return {
            getData: getData
        };
      });
    return(
        <TextInput
        placeholder = {props.placeholder}
        onChangeText = {handleTextChange}
        value = {data}
        style = {props.style}

        />
    )
})
export default Input;