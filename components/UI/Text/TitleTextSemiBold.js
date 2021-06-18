import React from "react";
import { Text, StyleSheet } from "react-native";

const TitleText = (props) => (
  <Text style={{ ...props.style, ...styles.text }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "playfair-semibold",
    fontSize: 22,
  },
});

export default TitleText;
