import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Text, Container, Content, Button } from "native-base";
import { withSettingsContext } from "../../contexts/SettingsContext";
import Scoreboard from "./Scoreboard";
import AddScore from "./AddScore";

const User = ({ settings }) => {
  return (
    <View style={styles.container}>
      <Scoreboard />
      <AddScore />
    </View>
  );
};

export default withSettingsContext(User);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between"
  }
});
