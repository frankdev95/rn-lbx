import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyTextRegular = (props) => (
  <Text {...props} style={{ ...styles.text, ...props.style }}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-regular",
    fontSize: 14,
  },
});

export default BodyTextRegular;
