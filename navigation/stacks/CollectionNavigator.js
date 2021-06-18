import React from "react";
import { Stack } from "../Navigators";
import ScreenOptions from "../config/ScreenOptions";
import CollectionScreen from "../../screens/portfolio/CollectionScreen";
import BottleDetailsScreen from "../../screens/bottles/BottleDetailsScreen";
import HeaderDrawerButton from "../../components/UI/Header/HeaderDrawerButton";

export default () => (
  <Stack.Navigator screenOptions={ScreenOptions}>
    <Stack.Screen
      name="Collection"
      component={CollectionScreen}
      options={({ navigation, route }) => ({
        headerLeft: () => <HeaderDrawerButton navigation={navigation} />,
      })}
    />
    <Stack.Screen name="BottleDetails" component={BottleDetailsScreen} />
  </Stack.Navigator>
);
