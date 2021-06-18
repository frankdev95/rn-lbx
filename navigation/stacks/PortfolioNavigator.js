import React from "react";
import { Stack } from "../Navigators";
import PortfolioDashboard from "../../screens/portfolio/PortfolioDashboard";
import CollectionScreen from "../../screens/portfolio/CollectionScreen";

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={PortfolioDashboard} />
      <Stack.Screen name="Collection" component={CollectionScreen} />
    </Stack.Navigator>
  );
};
