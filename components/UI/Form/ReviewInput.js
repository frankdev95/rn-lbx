import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import BodyTextSemiBold from "../Text/BodyTextSemiBold";

const ReviewInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <BodyTextSemiBold style={styles.title}>{props.title}</BodyTextSemiBold>
      <TextInput {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default ReviewInput;
