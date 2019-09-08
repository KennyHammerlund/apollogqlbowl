import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is the home screen</Text>
      <Button onPress={() => navigation.toggleDrawer()} title="Open Drawer" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
