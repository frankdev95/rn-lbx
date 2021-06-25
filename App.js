import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import AuthHandler from "./components/app/AuthHandler";

import AuthReducer from "./store/reducers/auth";
import BottlesReducer from "./store/reducers/bottles";
import PortfolioReducer from "./store/reducers/portfolio";
import ReviewReducer from "./store/reducers/review";
import StatsReducer from "./store/reducers/stats";

const rootReducer = combineReducers({
  auth: AuthReducer,
  bottles: BottlesReducer,
  portfolio: PortfolioReducer,
  review: ReviewReducer,
  stats: StatsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semibold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "playfair-medium": require("./assets/fonts/PlayfairDisplay-Medium.ttf"),
    "playfair-regular": require("./assets/fonts/PlayfairDisplay-Regular.ttf"),
    "playfair-semibold": require("./assets/fonts/PlayfairDisplay-SemiBold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <AuthHandler />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
