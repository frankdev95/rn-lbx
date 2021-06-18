import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, StyleSheet } from "react-native";
import { getCollection } from "../../store/actions/portfolio";
import CollectionItem from "../../components/app/CollectionItem";
import { deleteCollectionItem } from "../../store/actions/portfolio";
import BodyTextRegular from "../../components/UI/Text/BodyTextRegular";
import AppButton from "../../components/UI/AppButton";
import colors from "../../constants/Colors";
import Spinner from "../../components/UI/Spinner";

const CollectionScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const collection = useSelector((state) => state.portfolio.collection);
  const dispatch = useDispatch();

  const renderCollectionItem = ({ item }) => {
    return (
      <CollectionItem
        id={item.id}
        onViewDetails={() =>
          navigation.navigate("BottleDetails", {
            id: item.id,
          })
        }
        onDeleteItem={() => dispatch(deleteCollectionItem(item.id))}
      />
    );
  };

  const loadBottles = useCallback(async () => {
    setIsError(null);
    setIsLoading(true);
    try {
      await dispatch(getCollection());
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadBottles);
    return unsubscribe;
  }, [loadBottles]);

  if (isLoading) return <Spinner />;

  if (!isLoading && collection.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <BodyTextRegular style={styles.message}>
          There are currently no bottles in your collection, add some to get
          started!
        </BodyTextRegular>
        <AppButton
          style={styles.messageBtn}
          onPress={() => navigation.navigate("Bottles")}
        >
          View Bottles
        </AppButton>
      </View>
    );
  }

  if (!isLoading && collection.length > 0) {
    return (
      <View style={styles.screen}>
        <FlatList
          data={collection}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCollectionItem}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fdfaf6",
    flex: 1,
    padding: 10,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  messageBtn: {
    backgroundColor: colors.clrBgPrimaryAuth,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0EBCC",
    alignSelf: "center",
    paddingHorizontal: 35,
    paddingVertical: 12,
  },
});

export default CollectionScreen;
