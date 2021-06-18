import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WishlistScreen = ({ navigation, route }) => {
  return (
    <View style={styles.screen}>
      <Text>Wishlist Screen</Text>
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

export default WishlistScreen;
