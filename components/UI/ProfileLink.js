import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import BodyTextRegular from "../UI/Text/BodyTextRegular";
import BodyTextLight from "../UI/Text/BodyTextLight";
import AppButton from "../UI/AppButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileLink = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.imgContainer}>
          {props.imgSource ? (
            <Image style={styles.image} source={props.imgSource} />
          ) : (
            props.icon
          )}
        </View>
        <BodyTextLight style={styles.text}>{props.link}</BodyTextLight>
      </View>
      <AppButton style={styles.button}>
        <Icon name="arrow-forward-ios" size={15} />
      </AppButton>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  imgContainer: {
    marginRight: 20,
    width: 40,
    alignItems: "center",
  },
  image: {
    width: 35,
    height: 35,
  },
  text: {
    fontSize: 22,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#eeeeee",
    padding: 15,
  },
});

export default ProfileLink;
