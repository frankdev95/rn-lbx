import React from "react";
import { View, Image, StyleSheet } from "react-native";

const IndicatorIcon = (props) => {
  return (
    <View
      style={{ ...styles.container, borderColor: props.color || "#687980" }}
    >
      <Image
        source={props.source}
        style={{ ...styles.image, tintColor: props.color || "#687980" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#687980",
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  image: {
    tintColor: "red",
    width: 18,
    height: 18,
  },
});

export default IndicatorIcon;
