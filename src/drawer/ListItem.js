import React from "react";
import { View } from "react-native";
import { Text, H3 } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment";

const actions = {
  FIELD_GOAL: "FG",
  TOUCHDOWN: "TD",
  SAFTEY: "ST",
  EXTRA_POINT: "EP",
  CONVERSION: "2PC"
};

export default ({ item }) => {
  const time = moment.unix(item.timeStamp).format("hh:mm:ss");
  return (
    <View style={styles.row}>
      <H3 style={styles.time}>{`${time} - `}</H3>

      {item.optimistic ? (
        <H3 style={[styles.action, styles.optimistic]}>{`${
          actions[item.type]
        }`}</H3>
      ) : (
        <H3 style={[styles.action, styles.server]}>{`${
          actions[item.type]
        }`}</H3>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  row: {
    flexDirection: "row",
    borderWidth: 1,
    marginTop: -1,
    borderColor: "$lightGrey",
    padding: 5, 
    backgroundColor: '$white'
  },
  time: {
    fontSize: "$medium",
    color: "$muted"
  },
  action: {
    fontSize: "$large",
    fontWeight: "500"
  },
  optimistic: {
    color: "$primary"
  },
  server: {
    color: "$red"
  }
});
