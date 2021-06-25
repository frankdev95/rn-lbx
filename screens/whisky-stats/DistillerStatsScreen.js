import React, { useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import { getDistillers } from "../../store/actions/stats";

const DistillerStatsScreen = ({}) => {
  const distillers = useSelector((state) => state.stats.distillers);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getDistillers());
      } catch (error) {}
    })();
  }, []);

  return (
    <View>
      <Text>Distiller Stats Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DistillerStatsScreen;
