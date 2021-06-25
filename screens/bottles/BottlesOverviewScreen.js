import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getBottles } from "../../store/actions/bottles";
import HeaderDrawerButton from "../../components/UI/Header/HeaderDrawerButton";
import BottleItem from "../../components/app/BottleItem";
import Spinner from "../../components/UI/Spinner";
import BodyTextRegular from "../../components/UI/Text/BodyTextRegular";

const BottlesOverviewScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const bottles = useSelector((state) => state.bottles.bottles);
  const dispatch = useDispatch();

  const renderBottleItem = ({ item }) => {
    return (
      <BottleItem
        id={item.id}
        onViewDetails={() =>
          navigation.navigate("BottleDetails", {
            id: item.id,
            title: item.brand,
          })
        }
      />
    );
  };

  const loadBottles = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      await dispatch(getBottles());
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadBottles();
  }, [loadBottles]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderDrawerButton navigation={navigation} />,
    });
  }, [navigation]);

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <View style={styles.centered}>
        <BodyTextRegular>{isError}</BodyTextRegular>
      </View>
    );

  return (
    <View style={styles.screen}>
      <FlatList
        data={bottles}
        keyExtractor={(bottle) => bottle.id.toString()}
        renderItem={renderBottleItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottlesOverviewScreen;
