import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Icon, Text, Container, Content, Button } from "native-base";
import { withSettingsContext } from "../../contexts/SettingsContext";
import Scoreboard from "./Scoreboard";
import AddScore from "./AddScore";
import Field from "../../../assets/sbField.png";

const User = ({}) => {
  return (
    <ImageBackground source={Field} style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={[styles.halfScreen, { paddingLeft: 10, paddingRight: 5 }]}>
          <Scoreboard ui />
        </View>
        <View style={[styles.halfScreen, { paddingRight: 10, paddingLeft: 5 }]}>
          <Scoreboard />
        </View>
      </View>
      <AddScore />
    </ImageBackground>
  );
};

export default withSettingsContext(User);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  halfScreen: {
    width: "50%"
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  }
});
