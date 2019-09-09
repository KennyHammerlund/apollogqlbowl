import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Picker
} from "native-base";
import colors from "../theme";
import { withSettingsContext } from "../contexts/SettingsContext";

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

const Drawer = ({ navigation, settings }) => {
  const [delay, setDelay] = useState(settings.delay);
  const [email, setEmail] = useState(settings.email);
  const [buttonState, setButtonState] = useState();

  const onUpdateSettings = () => {
    setButtonState("LOADING");
    setButtonState(null);
    const optimistic = false;
    settings.updateSettings(email, delay, optimistic);
    navigation.toggleDrawer();
  };

  const onDelete = () => {
    setEmail(null);
    setDelay(null);
    settings.resetSettings();
  };
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/home.jpg")} style={styles.image} />

      {settings.loaded ? (
        <Container style={{ width: "90%" }}>
          <Content>
            <Text
              style={{
                fontWeight: "700",
                color: colors.primary,
                fontSize: 22,
                marginVertical: 25
              }}
            >
              Player Settings
            </Text>
            <Item>
              <Icon active name="md-mail" />
              <Input
                placeholder="email"
                placeholderTextColor={colors.muted}
                onChangeText={t => setEmail(t)}
                value={email}
              />
            </Item>
            <Item picker>
              <Text style={{ fontWeight: "500" }}>Delay: </Text>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: "80%" }}
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
            <Button
              onPress={() => onUpdateSettings()}
              block
              style={{ backgroundColor: colors.primary, marginTop: 20 }}
              disabled={buttonState === "LOADING"}
            >
              <Text style={{ fontWeight: "500", color: colors.softWhite }}>
                {buttonState === "LOADING"
                  ? "Updating. ."
                  : buttonState === "COMPLETE"
                  ? "Update Complete"
                  : "Confirm settings"}
              </Text>
            </Button>
            <Button
              onPress={() => onDelete()}
              block
              style={{
                backgroundColor: colors.red,
                borderColor: colors.red,
                marginTop: 20
              }}
            >
              <Text style={{ fontWeight: "500", color: colors.softWhite }}>
                Clear settings
              </Text>
            </Button>
          </Content>
        </Container>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator color="#0061aa" size="large" />
        </View>
      )}
    </View>
  );
};

export default withSettingsContext(Drawer);

const styles = StyleSheet.create({
  container: {
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
