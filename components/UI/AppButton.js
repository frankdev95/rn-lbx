import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import BodyTextRegular from "../UI/Text/BodyTextRegular";

const AppButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...props.style, ...styles.button }}
      onPress={props.onPress}
    >
      <BodyTextRegular style={{ ...props.textStyle }}>
        {props.children}
      </BodyTextRegular>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppButton;
