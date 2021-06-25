import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Image, StyleSheet } from "react-native";
import BodyTextSemiBold from "../../components/UI/Text/BodyTextSemiBold";
import Colors from "../../constants/Colors";
import icons from "../../constants/Icons";

const StatsDashboardScreen = ({ navigation, route }) => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.card}>
          <Image style={styles.img} source={icons.whisky} />
          <View style={styles.textContainer}>
            <BodyTextSemiBold style={styles.text}>Bottles</BodyTextSemiBold>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("DistillerStats")}
      >
        <View style={styles.card}>
          <Image style={styles.img} source={icons.distillery} />
          <View style={styles.textContainer}>
            <BodyTextSemiBold style={styles.text}>Distiller</BodyTextSemiBold>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.card}>
          <Image style={styles.img} source={icons.cask} />
          <View style={styles.textContainer}>
            <BodyTextSemiBold style={styles.text}>Regions</BodyTextSemiBold>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.card}>
          <Image style={styles.img} source={icons.cask} />
          <View style={styles.textContainer}>
            <BodyTextSemiBold style={styles.text}>WWI</BodyTextSemiBold>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  cardContainer: {
    width: "50%",
    height: 250,
  },
  card: {
    backgroundColor: "#eee",
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Colors.clrSpinnerGrey,
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: 125,
    height: 125,
  },
  textContainer: {
    backgroundColor: Colors.clrSpinnerGrey,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  text: {
    fontSize: 22,
  },
});

export default StatsDashboardScreen;
