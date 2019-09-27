import React from "react";
import { View } from "react-native";
import { Text, H3 } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment";

const actions = {
  FIELD_GOAL: "Field Goal",
  TOUCHDOWN: "Touchdown",
  SAFTEY: "ST",
  EXTRA_POINT: "EP",
  CONVERSION: "2PC"
};

export default ({ item }) => {
  const time = moment.unix(item.timeStamp).format("hh:mm:ss");
  return (
    <View
      style={item.optimistic ? [styles.row, styles.optimisticRow] : styles.row}
    >
      <H3 style={styles.time}>{`${time} - `}</H3>

      {item.optimistic ? (
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            flexDirection: "row"
          }}
        >
          <H3 style={[styles.action, styles.optimistic]}>{`${actions[
            item.type
          ].toUpperCase()}`}</H3>
          <Text>Optimistic</Text>
        </View>
      ) : (
        <H3 style={[styles.action, styles.server]}>{`${actions[
          item.type
        ].toUpperCase()}`}</H3>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  row: {
    flexDirection: "row",
    borderWidth: 1,
    marginTop: -1,
    borderColor: "$muted",
    padding: 5,
    backgroundColor: "$white"
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
    color: "$black"
  },
  optimisticRow: {
    backgroundColor: "$errorBackground"
  },
  server: {
    color: "$primary"
  }
});
