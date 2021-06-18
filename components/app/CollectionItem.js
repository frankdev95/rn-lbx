import React, { useEffect } from "react";
import { Rating } from "react-native-elements";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserBottles } from "../../store/actions/portfolio";
import Colors from "../../constants/Colors";
import icons from "../../constants/Icons";
import BodyTextSemiBold from "../UI/Text/BodyTextSemiBold";
import BodyTextRegular from "../UI/Text/BodyTextRegular";
import StatIcon from "../UI/Item/StatIcon";
import IndicatorIcon from "../UI/Item/IndicatorIcon";

const CollectionItem = (props) => {
  const bottles = useSelector((state) => state.portfolio.collection);
  const bottle = bottles.find((bottle) => bottle.id === props.id);
  const bottleListMeta =
    useSelector((state) => state.portfolio.userBottles[bottle.id]) || {};

  const dispatch = useDispatch();
  const source = { uri: bottle["img_url"] };

  useEffect(() => {
    dispatch(getUserBottles(bottle.id));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.optionsContainer}>
        <View style={styles.indicatorsContainer}>
          <IndicatorIcon
            source={icons.whisky}
            color={Colors.clrBtnPrimaryAuth}
          />
          <IndicatorIcon
            source={icons.heart}
            color={bottleListMeta.wishlist && Colors.clrBtnPrimaryAuth}
          />
          <IndicatorIcon
            source={icons.review}
            color={bottleListMeta.review && Colors.clrBtnPrimaryAuth}
          />
        </View>
        <TouchableOpacity
          style={styles.deleteBtnContainer}
          onPress={() =>
            Alert.alert(
              "Delete Item",
              "Are you sure you want to remove this item from this collection?",
              [
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: props.onDeleteItem,
                },
                {
                  text: "Cancel",
                },
              ]
            )
          }
        >
          <BodyTextRegular>Delete</BodyTextRegular>
          <Image style={styles.deleteBtn} source={icons.delete} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onViewDetails}>
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={source} />
          <View style={styles.detailsContainer}>
            <BodyTextSemiBold
              style={styles.title}
            >{`${bottle.brand} ${bottle.title} (${bottle.age} Years)`}</BodyTextSemiBold>
            <View style={styles.statsContainer}>
              <StatIcon
                detail={`£${bottle["latest_price"]}`}
                source={icons.price}
              />
              <StatIcon detail={bottle["cask_type"]} source={icons.cask} />
              <StatIcon detail={bottle.distillery} source={icons.distillery} />
            </View>
          </View>
          <View style={{ flex: 1, padding: 5 }}>
            <Image
              source={icons.whisky}
              style={{
                width: 30,
                height: 30,
                marginLeft: "auto",
                tintColor: Colors.clrBtnPrimaryAuth,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.itemInfoContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={icons.calendar}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
          />
          <BodyTextRegular>
            Date Added: {new Date().toLocaleDateString()}
          </BodyTextRegular>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
  },
  itemContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  optionsContainer: {
    backgroundColor: "#eeeeee",
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  deleteBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteBtn: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  indicatorsContainer: {
    flexDirection: "row",
  },
  indicatorIcon: {
    width: 25,
    height: 25,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  title: {
    marginBottom: 5,
  },
  image: {
    resizeMode: "cover",
    width: 50,
    height: 90,
    marginRight: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  detailsContainer: {
    marginLeft: 10,
    paddingTop: 10,
  },
  itemInfoContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#FAF1E6",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default CollectionItem;
