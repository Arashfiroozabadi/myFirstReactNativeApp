import * as React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Button } from "./Themed";

type TabParamList = {
  TabHomeScreen: undefined;
  TabProfileScreen: undefined;
  TabSearchScreen: undefined;
};

type Props = {
  component: React.ComponentType<any>;
  name: "TabHomeScreen" | "TabProfileScreen" | "TabSearchScreen";
  title?: any;
};
const uri =
  "https://scontent-ort2-1.cdninstagram.com/v/t51.2885-19/s150x150/41187899_505114266565984_455469324551847936_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com&_nc_ohc=YY_ILdBodSAAX-lfIIV&oh=ae4646ec39571af2b5baa833554a848c&oe=5F2D776B";

const Avatar = (): JSX.Element => {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{
        uri: uri,
      }}
    />
  );
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
          headerTitle: (props: any) => <Avatar {...props} />,
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
