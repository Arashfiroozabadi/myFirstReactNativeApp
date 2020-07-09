import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import { Container, Text, Header, Content } from "native-base";
import { useDispatch } from "react-redux";

import { BaseButton } from "../components";

function Search(): JSX.Element {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setisLoading(false);

    return () => {
      null;
    };
  }, []);
  if (isLoading) {
    return <AppLoading />;
  }
  return (
    <Container>
      <Header />
      <Content>
        <BaseButton
          onPress={() => {
            dispatch({ type: "dark" });
          }}
        >
          <Text>search</Text>
        </BaseButton>
      </Content>
    </Container>
  );
}

export default Search;
