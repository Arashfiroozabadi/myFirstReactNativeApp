import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Platform, Modal } from "react-native";
import { AppLoading } from "expo";
import { useDispatch } from "react-redux";

import {
  View,
  Button,
  Text,
  BaseButton,
  IconBase,
  InputBase,
} from "../components/Themed";
import { Header, Right, Item } from "native-base";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 10,
    ...Platform.select({
      android: {
        // marginTop: StatusBar.currentHeight,
      },
    }),
  },
  modal: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalTitle: {
    paddingHorizontal: 10,

    marginTop: 65,
  },
  modalBody: {
    paddingHorizontal: 20,

    height: 250,
    // backgroundColor: "red",
  },
  modalClose: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
});

function Search({
  navigation,
}: StackScreenProps<RootStackParamList>): JSX.Element {
  const [isLoading, setisLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const openModal = (): void => {
      setModalVisible(!modalVisible);
    };
    navigation.setOptions({
      header: () => {
        return (
          <Header transparent searchBar rounded style={styles.header}>
            <Right>
              <Item>
                <BaseButton>
                  <Text>Search</Text>
                </BaseButton>
                <InputBase placeholder="Search" />
                <IconBase onPress={openModal} name="md-options" />
              </Item>
            </Right>
          </Header>
        );
      },
    });
    setisLoading(false);

    return () => {
      null;
    };
  }, [modalVisible, dispatch, navigation]);

  if (isLoading) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          lightColor="rgba(255,255,255,0.9)"
          darkColor="rgba(0,0,0,0.8)"
          style={styles.modal}
        >
          <View style={styles.modalTitle}>
            <Text>Search Options</Text>
          </View>
          <View style={styles.modalBody}>
            <Text>I'm Body</Text>
          </View>
          <View style={styles.modalClose}>
            <Button
              title="X"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
      <Button
        title="test"
        onPress={() => {
          dispatch({ type: "dark" });
          setModalVisible(!modalVisible);
        }}
      />
    </View>
  );
}

export default Search;
