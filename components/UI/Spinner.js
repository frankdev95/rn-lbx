import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const Spinner = (props) => {
  return (
    <View style={{ ...styles.screen, ...props.style }}>
      <ActivityIndicator size="large" color={Colors.clrSpinnerGrey} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Spinner;
