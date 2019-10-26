import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import { graphql } from "react-apollo";

import colors from "../../theme";
import GET_VIEWER from "../../apollo/queries/viewer";

const Scoreboard = ({ data, ui }) => {
  // if we used a react Component class it would auto update but because we are
  // using a function we need to watch the data prop for changes and rerender
  useEffect(() => {}, [data]);

  if (data && data.loading)
    return <ActivityIndicator size="large" color="#0061aa" />;

  const { viewer } = data || {};
  const { actions } = viewer || {};

  const score =
    actions && actions.length > 0
      ? actions
          .filter(item => {
            return !item.optimistic;
          })
          .map(o => o.value)
          .reduce((acc, item) => acc + item)
      : 0;
  const optimisticScore =
    actions && actions.length > 0
      ? actions.map(o => o.value).reduce((acc, item) => acc + item)
      : 0;
  const optimisticLoading =
    !ui && actions && actions.length > 0 && actions.some(act => act.optimistic);
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {!ui ? (
            <View style={[styles.scoreBox, styles.serverBox]}>
              <Text style={styles.title}>
                {optimisticLoading ? "loading..." : "SERVER"}
              </Text>
              <Text style={styles.score}>{score}</Text>
            </View>
          ) : (
            <View style={[styles.scoreBox, styles.uiBox]}>
              <Text style={styles.title}>UI</Text>
              <Text style={styles.score}>{optimisticScore}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </>
  );
};

export default graphql(GET_VIEWER)(Scoreboard);

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row"
  },
  scoreBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8
  },
  serverBox: {
    backgroundColor: "$red"
  },
  uiBox: {
    backgroundColor: "$primary"
  },
  score: {
    color: colors.softWhite,
    fontWeight: "900",
    fontSize: 38
  },
  title: {
    color: colors.softWhite,
    fontWeight: "700",
    fontSize: 22
  }
});
