import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import BodyTextRegular from "../Text/BodyTextRegular";
import BodyTextSemiBold from "../Text/BodyTextSemiBold";

const StyleIcon = (props) => {
  return (
    <View style={{ ...styles.icon, ...props.style }}>
      <View style={{ ...styles.iconBorder, borderColor: props.color }}>
        <View style={{ ...styles.iconContainer, backgroundColor: props.color }}>
          <View>
            <BodyTextSemiBold style={styles.ratText}>
              {props.rating}
            </BodyTextSemiBold>
          </View>
        </View>
      </View>
      <BodyTextRegular style={styles.attText}>
        {props.attribute}
      </BodyTextRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
  },
  iconBorder: {
    borderRadius: 20,
    borderWidth: 4,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    margin: 2,
  },
  ratText: {
    fontSize: 14,
    color: "white",
  },
  attText: {
    marginTop: 5,
    fontSize: 10,
  },
});

export default StyleIcon;
