import React from "react";
import { View } from "react-native";
import AddTouchdown from "./AddTouchdown/AddTouchdown";
import AddFieldGoal from "./AddFieldGoal/AddFieldGoal";

import EStyleSheet from "react-native-extended-stylesheet";

const AddScore = ({}) => {
  return (
    <View style={styles.container}>
      <AddTouchdown />
      <AddFieldGoal />
    </View>
  );
};

export default AddScore;

const styles = EStyleSheet.create({
  container: {
    marginTop: 15,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000"
  }
});
