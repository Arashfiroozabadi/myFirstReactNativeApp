import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Platform, Modal, ScrollView, Image } from "react-native";
import { AppLoading } from "expo";
import { useDispatch } from "react-redux";
import {
  Header,
  Right,
  Item,
  ListItem,
  CheckBox,
  Body,
  Spinner,
  Card,
  CardItem,
  Left,
} from "native-base";
import { StackScreenProps } from "@react-navigation/stack";
import Axios from "axios";

import {
  View,
  Button,
  Text,
  BaseButton,
  IconBase,
  InputBase,
} from "../components/Themed";
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
    // height: 250,
    // backgroundColor: "red",
  },
  modalClose: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    padding: 10,
  },
  cardBody: {
    padding: 5,
  },
  cardHeader: {
    paddingHorizontal: 10,
  },
});

interface SearchType {
  q?: string;
  type?: { checked?: boolean; value?: string }[] | any;
}
interface DataType {
  artists: {
    items: Array<{
      id: string;
      images: Array<{
        height: number;
        url: string;
        width: number;
      }>;
      name: string;
    }>;
    total: string;
  };
}
function Search({
  navigation,
}: StackScreenProps<RootStackParamList>): JSX.Element {
  const [isLoading, setisLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [Data, setData] = useState<DataType>();
  const [SearchOption, setSearchOption] = useState<SearchType>({
    q: "",
    type: [
      { value: "album", checked: true },
      { value: "artist", checked: false },
      { value: "playlist", checked: true },
      { value: "track", checked: false },
      { value: "show", checked: false },
      { value: "episode", checked: false },
    ],
  });

  const dispatch = useDispatch();

  const handleChange = (index: number) => () => {
    const newArr = [...SearchOption.type];
    newArr[index] = { ...newArr[index], checked: !newArr[index].checked };

    setSearchOption({ type: newArr });
  };

  useEffect(() => {
    const openModal = (): void => {
      setModalVisible(!modalVisible);
    };
    function handleChangeText(text: string): void {
      setSearchOption({ ...SearchOption, q: text });
    }

    function handleSearch(): void {

      const url = "https://spotify-data-list.herokuapp.com/search";
      const query = SearchOption.q;
      Axios.get(url, { params: { q: query, type: "artist" } })
        .then((response) => {
          console.log(response.data.artists);
          setData(response.data);
        })
        .catch((e) => {
          alert(e.message);
          throw e;
        });
    }
    navigation.setOptions({
      header: () => {
        return (
          <Header transparent searchBar rounded style={styles.header}>
            <Right>
              <Item>
                <BaseButton onPress={() => handleSearch()}>
                  <Text>Search</Text>
                </BaseButton>
                <InputBase
                  onChangeText={(text) => handleChangeText(text)}
                  placeholder="Search"
                />
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
  }, [modalVisible, dispatch, navigation, SearchOption.type, SearchOption]);

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
            <Text>I&apos;m Body</Text>
            {SearchOption.type.map((v, i) => (
              <ListItem key={i}>
                <CheckBox checked={v.checked} onPress={handleChange(i)} />
                <Body>
                  <Text>{v.value}</Text>
                </Body>
              </ListItem>
            ))}
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
      <View style={styles.list}>
        <ScrollView>
          <Text>{SearchOption.q}</Text>
          {Data ? <Text>{Data.artists.total}</Text> : null}
          <View>
            {Data ? (
              Data.artists.items.map((d) => (
                <Card style={styles.card} key={d.id}>
                  <View style={styles.cardHeader}>
                    <Text>{d.name}</Text>
                    <Text>ID: {d.id}</Text>
                  </View>
                  <View style={styles.cardBody}>
                    <Image
                      source={{ uri: d.images[0] ? d.images[0].url : "null" }}
                      style={{
                        height: 100,
                        width: 100,
                      }}
                    />
                  </View>
                </Card>
              ))
            ) : (
              <Spinner />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Search;
