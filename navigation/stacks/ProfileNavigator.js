import React from "react";
import { Stack } from "../Navigators";
import screenOptions from "../config/ScreenOptions";
import DashboardScreen from "../../screens/profile/DashboardScreen";
import CollectionScreen from "../../screens/portfolio/CollectionScreen";
import WishlistScreen from "../../screens/profile/WishlistScreen";
import BottleDetailsScreen from "../../screens/bottles/BottleDetailsScreen";

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={DashboardScreen}
        name="Dashboard"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        component={CollectionScreen}
        name="Collection"
        options={screenOptions}
      />
      <Stack.Screen
        component={WishlistScreen}
        name="Wishlist"
        options={screenOptions}
      />
      <Stack.Screen component={BottleDetailsScreen} name="BottleDetails" />
    </Stack.Navigator>
  );
};
