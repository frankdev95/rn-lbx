import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import BodyTextRegular from "../Text/BodyTextRegular";

const FlavourIcon = (props) => {
  return (
    <View
      style={{
        ...styles.iconContainer,
        ...props.style,
        borderColor: props.color,
      }}
    >
      <Image
        style={{ ...styles.iconImage, tintColor: props.color }}
        source={props.imgSource}
      />
      <BodyTextRegular
        numberOfLines={1}
        style={{ ...styles.text, color: props.color }}
      >
        {props.flavour}
      </BodyTextRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 10,
  },
});

export default FlavourIcon;
