import React from "react";
import { TouchableOpacity, Text, CheckBox, StyleSheet } from "react-native";

const Checkbox = (props) => {
  return (
    <TouchableOpacity
      style={styles.checkBoxContainer}
      onPress={props.onValueChange}
    >
      <CheckBox value={props.value} onValueChange={props.onValueChange} />
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 5,
  },
});

export default Checkbox;
