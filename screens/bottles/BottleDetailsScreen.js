import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import colorPalettes from "../../constants/ColorPalettes";
import icons from "../../constants/Icons";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { addToCollection } from "../../store/actions/portfolio";
import { IoniconsHeaderButton } from "../../components/UI/Header/HeaderButtons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import FlavourIcon from "../../components/UI/Bottle/FlavourIcon";
import BodyTextRegular from "../../components/UI/Text/BodyTextRegular";
import BodyTextLight from "../../components/UI/Text/BodyTextLight";
import StyleIcon from "../../components/UI/Bottle/StyleIcon";
import FactIcon from "../../components/UI/Bottle/FactIcon";
import AppButton from "../../components/UI/AppButton";
import Spinner from "../../components/UI/Spinner";

const BottleDetailsScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const { id } = route.params;
  const bottle = useSelector((state) => state.bottles.bottles).find(
    (bottle) => bottle.id === id
  );

  const imageSource = { uri: bottle["img_url"] };

  const dispatch = useDispatch();

  let colorPalette;

  try {
    colorPalette =
      colorPalettes[bottle.brand.toLowerCase()][bottle.title.toLowerCase()];
  } catch (error) {
    colorPalette = colorPalettes.default;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colorPalette.primary,
        elevation: 0,
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="add to collection"
            iconName="add-circle-outline"
            iconSize={28}
            onPress={() =>
              Alert.alert(
                "Add to Collection",
                "Would you like to add this bottle to your collection?",
                [
                  {
                    text: "OK",
                    style: "default",
                    onPress: () => addBottleHandler(),
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              )
            }
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const addBottleHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(addToCollection(bottle.id));
      Alert.alert(
        "Item added",
        `${bottle.brand} ${bottle.type} has been successfully added to your collection`,
        [
          {
            text: "To collection",
            onPress: () => navigation.navigate("Collection"),
          },
          {
            text: "Ok",
          },
        ]
      );
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isError)
    Alert.alert("", isError, [
      {
        text: "Ok",
        onPress: () => setIsError(null),
      },
    ]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <View style={styles.screen}>
      <View
        style={{ ...styles.summary, backgroundColor: colorPalette.primary }}
      >
        <View style={styles.summaryDetails}>
          <BodyTextRegular
            style={styles.title}
          >{`${bottle.brand} ${bottle.title}`}</BodyTextRegular>
          <BodyTextLight style={styles.description}>
            {bottle.description}
          </BodyTextLight>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.summaryImg} source={imageSource} />
        </View>
      </View>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: colorPalette.secondary,
          justifyContent: "space-between",
        }}
      >
        <View style={{ ...styles.details }}>
          <View style={styles.detailsLeft}>
            <BodyTextRegular
              style={{ ...styles.title, color: colorPalette.tertiary }}
            >
              Flavours
            </BodyTextRegular>
            <View
              style={{
                borderRightWidth: 1,
                borderRightColor: colorPalette.tertiary,
                paddingRight: 15,
              }}
            >
              <View style={styles.flavourIcons}>
                {bottle.flavours.map((flavour, index) => {
                  const marginRight =
                    index < bottle.flavours.length - 1 ? 10 : 0;
                  return (
                    <FlavourIcon
                      key={flavour}
                      flavour={flavour}
                      color={colorPalette.tertiary}
                      imgSource={icons[flavour.toLowerCase()]}
                      style={{ marginRight: marginRight }}
                    />
                  );
                })}
              </View>
              <View>
                <BodyTextRegular
                  style={{ color: colorPalette.tertiary, marginVertical: 25 }}
                >
                  Style
                </BodyTextRegular>
                <View style={styles.styleIcons}>
                  {bottle.style.map((style, index) => {
                    const marginRight =
                      index < bottle.style.length - 1 ? 13 : 0;
                    return (
                      <StyleIcon
                        key={style.attribute}
                        attribute={style.attribute}
                        rating={style.rating}
                        color={colorPalette.tertiary}
                        style={{ marginRight: marginRight }}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.detailsRight}>
            <BodyTextRegular
              style={{ marginBottom: 20, color: colorPalette.tertiary }}
            >
              {bottle.brand} Facts
            </BodyTextRegular>
            <View>
              <FactIcon
                imgSource={icons.distillery}
                imgSize={{ width: 25, height: 25 }}
                name="Distillery"
                description={bottle.distillery}
                color={colorPalette.tertiary}
              />
              <FactIcon
                imgSource={icons.cask}
                imgSize={{ width: 20, height: 20 }}
                name="Cask"
                description={`${bottle["cask_type"]}`}
                color={colorPalette.tertiary}
              />
              <FactIcon
                imgSource={icons.measuring}
                imgSize={{ width: 18, height: 18 }}
                name="Size"
                description={`${bottle.ml}ml`}
                color={colorPalette.tertiary}
              />
              <FactIcon
                imgSource={icons.percentage}
                imgSize={{ width: 15, height: 15 }}
                name="ABV"
                description={`${bottle.volume} %`}
                color={colorPalette.tertiary}
              />
            </View>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View
            style={{ ...styles.footer, backgroundColor: colorPalette.primary }}
          >
            <AppButton
              style={{
                ...styles.footerBtn,
                backgroundColor: colorPalette.secondary,
                borderColor: colorPalette.tertiary,
              }}
              textStyle={{ color: colorPalette.tertiary }}
            >
              MAKE AN OFFER
            </AppButton>
            <View style={styles.footerIcons}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Bottles");
                }}
              >
                <Ionicons
                  name="home-outline"
                  size={24}
                  color={colorPalette.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Add to Wishlist",
                    "Would you like to add this bottle to your wishlist?",
                    [
                      {
                        text: "OK",
                        onPress: () => {},
                      },
                      {
                        text: "Cancel",
                        style: "destructive",
                      },
                    ]
                  );
                }}
              >
                <AntDesign
                  name="hearto"
                  size={24}
                  color={colorPalette.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Leave Review",
                    "Would you like to leave a review for this bottle?",
                    [
                      {
                        text: "Ok",
                        onPress: () =>
                          navigation.navigate("ReviewForm", {
                            id: id,
                          }),
                      },
                      {
                        text: "Cancel",
                        style: "destructive",
                      },
                    ]
                  );
                }}
              >
                <MaterialIcons
                  name="rate-review"
                  size={28}
                  color={colorPalette.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  summary: {
    flexDirection: "row",
    paddingTop: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
  title: {
    color: "black",
    marginBottom: 20,
    fontSize: 18,
  },
  description: {
    color: "black",
  },
  summaryDetails: {
    width: "50%",
    marginRight: 15,
  },
  imageContainer: {
    width: 150,
    height: 160 * 1.86,
  },
  summaryImg: {
    flex: 1,
    resizeMode: "cover",
    width: undefined,
    height: undefined,
    position: "relative",
    top: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 15,
    position: "relative",
    marginTop: -15,
    flexDirection: "row",
    paddingTop: 60,
  },
  flavourIcons: {
    flexDirection: "row",
  },
  styleIcons: {
    flexDirection: "row",
  },
  detailsRight: {
    paddingLeft: 10,
  },
  footerBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  footerContainer: {
    paddingHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    borderRadius: 15,
    paddingVertical: 20,
    width: "100%",
    marginBottom: 20,
  },
  footerIcons: {
    flex: 1,
    marginLeft: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BottleDetailsScreen;
