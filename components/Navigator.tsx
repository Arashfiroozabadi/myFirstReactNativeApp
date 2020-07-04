import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text, Button } from "./Themed";

type TabParamList = {
  TabOneScreen: undefined;
  TabTwoScreen: undefined;
};

type Props = {
  component: React.ComponentType<any>;
  name: "TabOneScreen" | "TabTwoScreen";
  title?: string;
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabStack = createStackNavigator<TabParamList>();

function Navigator(props: Props): JSX.Element {
  const { name, component, title } = props;
  const colorScheme = useColorScheme();

  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name={name}
        options={{
          // headerTitle: (props) => <Text>test</Text>,
          title: title,
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title="Info"
              color="#00cc00"
            />
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme].headerBGC,
          },
          headerTintColor: Colors[colorScheme].text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        component={component}
      />
    </TabStack.Navigator>
  );
}

export default Navigator;
