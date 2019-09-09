import React from "react";
import { View } from "react-native";
import { Text, H3 } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment";

const actions = {
  FIELD_GOAL: "Field Goal",
  TOUCHDOWN: "Touchdown",
  SAFTEY: "Saftey",
  EXTRA_POINT: "Extra Point",
  CONVERSION: "2 Point Conversion"
};

export default ({ item }) => {
  const time = moment(item.timestamp).format("hh:mm:ss");
  return (
    <View style={styles.row}>
      <H3 style={styles.time}>{`${time} - `}</H3>
      <H3 style={styles.action}>{`${actions[item.type]}`}</H3>
    </View>
  );
};

const styles = EStyleSheet.create({
  row: {
    flexDirection: "row",
    borderWidth: 1,
    marginTop: -1,
    borderColor: "$lightGrey",
    padding: 5
  },
  time: {
    fontSize: "$medium",
    color: "$muted"
  },
  action: {
    fontSize: "$large",
    color: "$primary",
    fontWeight: "500"
  }
});
