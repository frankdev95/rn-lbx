import React from "react";
import { View, Image, StyleSheet } from "react-native";
import BodyTextRegular from "../Text/BodyTextRegular";

const StatIcon = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={props.source} />
      <BodyTextRegular style={styles.text}>{props.detail}</BodyTextRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 20,
  },
  image: {
    width: 18,
    height: 18,
    marginBottom: 2,
  },
  text: {
    fontSize: 10,
  },
});

export default StatIcon;
