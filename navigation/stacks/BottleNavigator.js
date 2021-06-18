import React from "react";
import { Stack } from "../Navigators";
import screenOptions from "../config/ScreenOptions";
import BottlesOverviewScreen from "../../screens/bottles/BottlesOverviewScreen";
import BottleDetailsScreen from "../../screens/bottles/BottleDetailsScreen";
import ReviewFormScreen from "../../screens/reviews/ReviewFormScreen";

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Bottles"
        component={BottlesOverviewScreen}
        options={{ title: "Bottles" }}
      />
      <Stack.Screen
        name="BottleDetails"
        component={BottleDetailsScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="ReviewForm"
        component={ReviewFormScreen}
        options={{
          title: "Write a Review",
        }}
      />
    </Stack.Navigator>
  );
};
