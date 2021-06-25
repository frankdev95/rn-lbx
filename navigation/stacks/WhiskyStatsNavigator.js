import React from "react";
import { Stack } from "../Navigators";
import screenOptions from "../config/ScreenOptions";
import StatsDashboardScreen from "../../screens/whisky-stats/StatsDashboardScreen";
import DistillerStatsScreen from "../../screens/whisky-stats/DistillerStatsScreen";

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="StatsDashboard"
        component={StatsDashboardScreen}
        options={{
          title: "Whisky Statistics",
        }}
      />
      <Stack.Screen
        name="DistillerStats"
        component={DistillerStatsScreen}
        options={{
          title: "Distiller Stats",
        }}
      />
    </Stack.Navigator>
  );
};
