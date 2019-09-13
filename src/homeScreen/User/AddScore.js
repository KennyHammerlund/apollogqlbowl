import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "native-base";
import AddTouchdown from "./AddTouchdown/AddTouchdown";

const AddScore = ({}) => {
  return (
    <View style={styles.container}>
      <AddTouchdown />
      <Button>
        <Text>Field Goal</Text>
      </Button>
    </View>
  );
};

export default AddScore;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
