import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyTextLight = (props) => (
  <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-light",
    fontSize: 14,
  },
});

export default BodyTextLight;
