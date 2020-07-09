import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./redux";

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();
  Font.useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
          <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
