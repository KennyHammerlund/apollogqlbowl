import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { Icon } from "native-base";

import colors from "../theme";
import User from "./User/User";
import NoUser from "./NoUser";
import { withSettingsContext } from "../contexts/SettingsContext";
import { isIphoneX } from "react-native-iphone-x-helper";

const Home = ({ navigation, settings }) => {
  return (
    <SafeAreaView>
      <Image source={require("../../assets/home.jpg")} style={styles.image} />
      <Icon
        active
        name="md-settings"
        style={styles.icon}
        onPress={() => navigation.toggleDrawer()}
      />
      <View style={styles.container}>
        {!settings.user ? <NoUser /> : <User />}
      </View>
    </SafeAreaView>
  );
};

export default withSettingsContext(Home);

const styles = StyleSheet.create({
  container: {
    height: "70%",
    paddingTop: 20,
    paddingBottom: isIphoneX ? 65 : 20,
    paddingHorizontal: 10
  },
  image: {
    height: Dimensions.get("screen").height * 0.3,
    overflow: "hidden",
    width: "100%"
  },
  icon: {
    color: colors.primary,
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 50
  }
});
