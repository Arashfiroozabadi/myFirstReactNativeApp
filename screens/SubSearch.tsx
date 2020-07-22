import React, { useState } from "react";
import { ScrollView } from "react-native";
import { View, Text, BaseButton } from "../components";
import Axios from "axios";
import { Spinner } from "native-base";

interface Props {
  type: "album" | "artist" | "playlist" | "track";
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

function SubSearch(props: Props): JSX.Element {
  const { type } = props;
  const [data, setData] = useState<DataType>();
  const [loading, setLoading] = useState(false);

  function search(): void {
    setLoading(true);
    const url = "https://spotify-data-list.herokuapp.com/search";
    Axios.get(url, {
      params: {
        q: "bahram",
        type: type,
      },
    }).then((result) => {
      setData(result.data);
      setLoading(false);
      console.log(data);
    });
  }
  return (
    <View>
      <BaseButton onPress={() => search()}>
        <Text>search</Text>
      </BaseButton>
      <ScrollView>
        <ListItems loading={loading} data={data?.artists.items} />
      </ScrollView>
    </View>
  );
}

export default SubSearch;

function ListItems(props) {
  const { loading, data } = props;
  if (loading) {
    return <Spinner />;
  }
  return (
    <ScrollView>
      {!data
        ? null
        : data.map((item: any) => <Text key={item.id}>{item.name}</Text>)}
    </ScrollView>
  );
}
