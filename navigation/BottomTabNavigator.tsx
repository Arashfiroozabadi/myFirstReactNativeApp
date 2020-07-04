import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList } from "../types";
import { Navigator } from "../components";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
  const colorScheme = useColorScheme();
  const count = useSelector((state: any) => state.count);

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      {/* Tab 1 */}
      <BottomTab.Screen
        name="TabOne"
        component={() => (
          <Navigator
            name="TabOneScreen"
            component={TabOneScreen}
            title={count}
          />
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />

      {/* Tab 2 */}
      <BottomTab.Screen
        name="TabTwo"
        component={() => (
          <Navigator
            name="TabTwoScreen"
            component={TabTwoScreen}
            title="Tab Two Title"
          />
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { color: string; name: string }): JSX.Element {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
