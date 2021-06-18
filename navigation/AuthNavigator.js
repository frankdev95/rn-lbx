import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "./Navigators";
import AuthScreen from "../screens/auth/AuthScreen";
import colors from "../constants/Colors";

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.clrBgPrimaryAuth,
            elevation: 0,
          },
        }}
      >
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
