import * as React from "react";
import { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, useSelector, useDispatch } from "react-redux";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, Button } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootStackParamList } from "../types";

function TabOneScreen({
  navigation,
}: StackScreenProps<RootStackParamList>): JSX.Element {
  const colorScheme = useColorScheme();
  const theme = useSelector((state: any) => state.theme);
  const count = useSelector((state: any) => state.count);

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("test");

    return () => {
      null;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{theme}</Text>
      <Button
        title="click me"
        color={Colors[colorScheme].button}
        onPress={() => {
          dispatch({ type: "INCREMENT" });
          dispatch({ type: "light" });
          navigation.setOptions({ title: count });
        }}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

export default connect((state: any) => ({ count: state.count }))(TabOneScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    height: 2,
    marginVertical: 30,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
