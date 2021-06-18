import React, { Fragment, useEffect, useReducer, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import {
  UPDATE_INPUT,
  LOSE_FOCUS,
  IS_FOCUSED,
} from "../../../constants/Actions";
import Validator from "../../../classes/Validation";

const inputReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_INPUT:
      return {
        ...state,
        value: action.value,
      };
    case LOSE_FOCUS:
      return {
        ...state,
        isValid: action.validity,
        onSubmit: true,
      };
    case IS_FOCUSED:
      return {
        ...state,
        onSubmit: false,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initalValidity,
    onSubmit: false,
  });

  const onChangeText = (text) =>
    dispatchInputState({ type: UPDATE_INPUT, value: text });

  const onBlurHandler = () => {
    const { isValid } = new Validator(props.validators, inputState.value);
    dispatchInputState({ type: LOSE_FOCUS, validity: isValid });
  };

  const onFocusHandler = () => dispatchInputState({ type: IS_FOCUSED });

  const { id, onInputChange } = props;

  useEffect(() => {
    if (inputState.onSubmit) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, id]);

  return (
    <Fragment>
      <View style={styles.inputContainer}>
        {props.label && <Text style={styles.label}>{props.label}</Text>}
        <TextInput
          {...props}
          onChangeText={onChangeText}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          value={inputState.value}
        />
      </View>
      {inputState.onSubmit && !inputState.isValid && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
  },
  errorText: {
    color: "grey",
    textAlign: "center",
    marginTop: -5,
  },
});

export default Input;
