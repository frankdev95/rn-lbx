import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import BodyTextLight from "../../UI/Text/BodyTextLight";
import BodyTextRegular from "../../UI/Text/BodyTextRegular";

const FactIcon = (props) => {
  return (
    <View style={styles.factContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            ...styles.iconImage,
            tintColor: props.color,
            ...props.imgSize,
          }}
          source={props.imgSource}
        />
      </View>
      <View>
        <BodyTextLight style={{ ...styles.text, color: props.color }}>
          {props.name}
        </BodyTextLight>
        <BodyTextRegular style={{ ...styles.text, color: props.color }}>
          {props.description}
        </BodyTextRegular>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  factContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  imageContainer: {
    width: 25,
    alignItems: "center",
    marginRight: 7,
  },
  iconImage: {
    resizeMode: "cover",
  },
  text: {
    fontSize: 12,
  },
});

export default FactIcon;
