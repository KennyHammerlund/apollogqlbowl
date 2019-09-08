import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const Drawer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Put the Drawer Menu here</Text>
      <Button onPress={() => navigation.toggleDrawer()} title="Close Drawer" />
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
