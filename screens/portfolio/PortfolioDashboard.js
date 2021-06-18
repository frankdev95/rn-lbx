import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PortfolioDashboard = ({ navigation, route }) => {
  return (
    <View style={styles.screen}>
      <Text>Portfolio Dashboard</Text>
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

export default PortfolioDashboard;
