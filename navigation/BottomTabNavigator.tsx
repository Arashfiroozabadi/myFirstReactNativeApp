import * as React from "react";
import { Image, Button, StyleSheet, Platform, StatusBar } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, RootStackParamList } from "../types";
import { Navigator } from "../components";
import Search from "../screens/SearchScreen";
import { View, Text } from "../components/Themed";
import { Left, Header, Right } from "native-base";
import SubSearch from "../screens/SubSearch";

const Stack = createStackNavigator<RootStackParamList>();

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const NavigatorOne = (): JSX.Element => {
  const count = useSelector((state: any) => state.count);
  return (
    <Navigator name="TabHomeScreen" component={TabOneScreen} title={count} />
  );
};

const NavigatorTwo = (): JSX.Element => {
  // const count = useSelector((state: any) => state.count);
  return <Navigator name="TabProfileScreen" component={TabTwoScreen} />;
};

const Album = (): JSX.Element => {
  return <SubSearch type="artist" />;
};

function NavigatorSearch(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="TabSearchScreen">
      <Stack.Screen name="TabSearchScreen" component={Search} />
      <Stack.Screen name="album" component={Album} />
      <Stack.Screen name="artist" component={SubSearch} />
      <Stack.Screen name="playlist" component={SubSearch} />
      <Stack.Screen name="track" component={SubSearch} />
    </Stack.Navigator>
  );
}

// const NavigatorSearch = (): JSX.Element => {
//   // const count = useSelector((state: any) => state.count);
//   return <Navigator name="TabSearchScreen" component={Search} />;
// };

export default function BottomTabNavigator(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      {/* Tab Home */}
      <BottomTab.Screen
        name="Home"
        component={NavigatorOne}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-home" color={color} />
          ),
        }}
      />

      {/* Tab 2 */}
      <BottomTab.Screen
        name="Profile"
        component={NavigatorTwo}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-contact" color={color} />
          ),
        }}
      />

      {/* Tab Search */}
      <BottomTab.Screen
        name="Search"
        component={NavigatorSearch}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-search" color={color} />
          ),
        }}
      />

      {/* ...other */}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { color: string; name: string }): JSX.Element {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
