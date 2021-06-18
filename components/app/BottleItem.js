import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { checkImage } from "../../functions/image";
import BodyTextSemiBold from "../UI/Text/BodyTextSemiBold";
import BodyTexRegular from "../UI/Text/BodyTextRegular";

const BottleItem = (props) => {
  const [imageSource, setImageSource] = useState(
    require("../../assets/images/img-placeholder.jpg")
  );
  const bottle = useSelector((state) => state.bottles.bottles).find(
    (bottle) => bottle.id === props.id
  );

  useEffect(() => {
    checkImage(bottle["img_url"]).then((isValid) => {
      isValid && setImageSource({ uri: bottle["img_url"] });
    });
  }, []);

  return (
    <TouchableOpacity onPress={props.onViewDetails}>
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={imageSource} />
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <BodyTextSemiBold style={styles.title}>
              {`${bottle.brand} ${bottle.title}`}
            </BodyTextSemiBold>
            <BodyTextSemiBold style={styles.age}>
              ({bottle.age} years)
            </BodyTextSemiBold>
          </View>

          <BodyTexRegular
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {bottle.description}
          </BodyTexRegular>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BottleItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: "#c8c2bc",
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    marginRight: 5,
  },
  age: {
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    resizeMode: "cover",
    width: 50,
    height: 90,
  },
  description: {
    fontSize: 12,
    color: "#687980",
  },
  detailsContainer: {
    paddingVertical: 12,
    justifyContent: "space-between",
    marginLeft: 15,
    width: "70%",
  },
});
