import * as React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList } from "../types";
import { Navigator } from "../components";
import Search from "../screens/SearchScreen";

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

const NavigatorSearch = (): JSX.Element => {
  // const count = useSelector((state: any) => state.count);
  return <Navigator name="TabSearchScreen" component={Search} />;
};

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
