import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import { Icon } from "native-base";
import { isIphoneX } from "react-native-iphone-x-helper";
import { useQuery } from "@apollo/react-hooks";
import EStyleSheet from "react-native-extended-stylesheet";

import colors from "../theme";
import User from "./User/User";
import NoUser from "./NoUser";
import GQLBOWL from "../../assets/gqlbowl.png";
import QUERY from "../apollo/queries/viewer";

const Home = ({ navigation }) => {
  const { data, loading, error } = useQuery(QUERY);
  return (
    <SafeAreaView>
      <Image source={GQLBOWL} style={styles.image} />
      <Icon
        active
        name="md-settings"
        style={styles.icon}
        onPress={() => navigation.toggleDrawer()}
      />

      {loading && (
        <View style={styles.container}>
          <ActivityIndicator color="#0061aa" size="large" />
        </View>
      )}
      {!loading && (
        <View style={styles.container}>
          {data.viewer && data.viewer.name ? <User /> : <NoUser />}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = EStyleSheet.create({
  container: {
    height: "70%",
    paddingBottom: isIphoneX ? 65 : 20,
    backgroundColor: "#000"
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
