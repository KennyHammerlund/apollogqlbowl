import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Container, Content, Item, Input, Icon, Picker } from "native-base";
import { useQuery } from "@apollo/react-hooks";

import ResetButton from "./resetButton";
import ConfirmSettings from "./ConfirmSettings";
import colors from "../theme";
import History from "./History";

import QUERY from "../apollo/queries/viewer";

const fibNum = {
  0: 1,
  1: 2,
  2: 3,
  3: 5,
  4: 8,
  5: 13,
  6: 21,
  7: 34,
  8: 55,
  9: 89
};

const Drawer = ({ navigation }) => {
  const { data, loading, error } = useQuery(QUERY);
  const [delay, setDelay] = useState(data && data.viewer && data.viewer.delay);
  const [email, setEmail] = useState(data && data.viewer && data.viewer.name);
  const [errorMessage, setError] = useState();
  useEffect(() => {
    if (data && data.viewer) {
      setEmail(data.viewer.name);
      setDelay(data.viewer.delay);
    }
  }, [data, loading]);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#0061aa" size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Container style={{ width: "90%" }}>
        <Text
          style={{
            fontWeight: "700",
            color: colors.primary,
            fontSize: 32,
            marginTop: 25,
            textAlign: "right"
          }}
        >
          Apollo GQL Bowl
        </Text>
        <Text
          style={{
            fontWeight: "700",
            color: colors.primary,
            fontSize: 22,
            marginBottom: 25,
            textAlign: "right"
          }}
        >
          Player Settings
        </Text>
        {errorMessage && (
          <Text
            style={{
              fontWeight: "500",
              color: colors.red,
              fontSize: 16,
              marginBottom: 5
            }}
          >
            {errorMessage}
          </Text>
        )}
        <Item>
          <Icon active name="md-mail" />
          <Input
            placeholder="email"
            placeholderTextColor={colors.muted}
            onChangeText={t => setEmail(t)}
            value={email}
          />
        </Item>
        <Item picker style={{ borderColor: "#333", borderWidth: 1 }}>
          <Text style={{ fontWeight: "500" }}>Delay: </Text>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            contentContainerStyle={{ flex: 1 }}
            headerStyle={{
              backgroundColor: colors.primary
            }}
            headerTitleStyle={{
              color: colors.primary
            }}
            placeholder="Server delay"
            placeholderStyle={{ color: colors.muted }}
            placeholderIconColor="#007aff"
            selectedValue={delay}
            onValueChange={v => setDelay(v)}
          >
            {Array.apply(null, Array(10)).map((k, i) => {
              return (
                <Picker.Item
                  label={`${fibNum[i]} Second${i === 0 ? "" : "s"}`}
                  value={fibNum[i]}
                  key={`${i}-s`}
                />
              );
            })}
          </Picker>
        </Item>
        <ConfirmSettings payload={{ name: email, delay }} setError={setError} />
        <ResetButton />
        <History />
      </Container>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: colors.softWhite,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: Dimensions.get("screen").height * 0.3,
    overflow: "hidden",
    width: "100%"
  }
});
