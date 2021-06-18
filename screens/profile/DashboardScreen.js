import React, { useLayoutEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import HeaderDrawerButton from "../../components/UI/Header/HeaderDrawerButton";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import Icons from "../../constants/Icons";
import Statistic from "../../components/UI/Informational/Statistic";
import BodyTextSemiBold from "../../components/UI/Text/BodyTextSemiBold";
import BodyTextRegular from "../../components/UI/Text/BodyTextRegular";
import ProfileLink from "../../components/UI/ProfileLink";
import AppButton from "../../components/UI/AppButton";

const DashboardScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderDrawerButton navigation={navigation} />,
    });
  }, [navigation]);

  const wishlistIcon = <AntDesign name="hearto" size={33} />;

  return (
    <View style={styles.screen}>
      <View style={styles.profileHeader}>
        <View style={styles.profileSummary}>
          <Avatar
            size={100}
            rounded
            icon={{ name: "account-circle" }}
            overlayContainerStyle={{ backgroundColor: "grey" }}
          >
            <Avatar.Accessory size={30} />
          </Avatar>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.statsContainer}>
              <Statistic name="Bottles" statistic="0" />
              <Statistic name="Friends" statistic="0" />
              <Statistic name="Worth" statistic="0" />
            </View>
            <View style={{ alignItems: "center" }}>
              <AppButton style={styles.editProfileBntn}>Edit Profile</AppButton>
            </View>
          </View>
        </View>
        <View style={styles.profileDescription}>
          <BodyTextSemiBold>{user.username}</BodyTextSemiBold>
          <BodyTextRegular>{user.description}</BodyTextRegular>
        </View>
      </View>
      <View style={styles.linksContainer}>
        <ProfileLink
          imgSource={Icons.whisky}
          link="Collection"
          onPress={() => navigation.navigate("Collection")}
        />
        <ProfileLink imgSource={Icons.camera} link="Moments" />
        <ProfileLink icon={wishlistIcon} link="Wishlist" />
        <ProfileLink imgSource={Icons.friends} link="Friend Requests" />
        <ProfileLink imgSource={Icons.message} link="Messages" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: 20,
  },
  profileSummary: {
    flexDirection: "row",
    alignItems: "center",
  },
  editProfileBntn: {
    width: "60%",
    borderWidth: 1,
    borderColor: "#eeeeee",
    paddingVertical: 5,
  },
  statsContainer: {
    marginLeft: 30,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  profileDescription: {
    marginTop: 20,
  },
  linksContainer: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
});

export default DashboardScreen;
