import React from "react";
import { View, StyleSheet } from "react-native";
import BodyTextSemiBold from "../Text/BodyTextSemiBold";
import BodyTextRegular from "../Text/BodyTextRegular";

const Statistic = (props) => (
  <View style={styles.container}>
    <BodyTextSemiBold style={styles.statistic}>
      {props.statistic}
    </BodyTextSemiBold>
    <BodyTextRegular>{props.name}</BodyTextRegular>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  statistic: {
    fontSize: 24,
    marginBottom: 5,
  },
});

export default Statistic;
