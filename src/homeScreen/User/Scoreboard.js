import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Text, H2 } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import { graphql } from "react-apollo";

import colors from "../../theme";
import QUERY from "../../apollo/queries/viewer";

import ListItem from "./ListItem";

const Scoreboard = ({ data }) => {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {}, [data]);
  if (data && data.loading)
    return <ActivityIndicator size="large" color="#0061aa" />;

  const { viewer } = data || {};
  const { actions } = viewer || {};

  const score =
    actions && actions.length > 0
      ? actions
          .map(o => (o.optimistic ? 0 : o.value))
          .reduce((acc, item) => acc + item)
      : 0;
  const uiScore =
    actions && actions.length > 0
      ? actions.map(o => o.value).reduce((acc, item) => acc + item)
      : 0;
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
          <View style={[styles.scoreBox, styles.serverBox]}>
            <Text style={styles.title}>Server</Text>
            <Text style={styles.score}>{score}</Text>
          </View>
          <View style={[styles.scoreBox, styles.uiBox]}>
            <Text style={styles.title}>UI</Text>
            <Text style={styles.score}>{uiScore}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <H2 style={styles.header}>Score History</H2>
        <FlatList
          data={actions.reverse()}
          style={{ paddingTop: 5, flex: -1, flexGrow: 0 }}
          renderItem={({ item }) => <ListItem item={item} />}
          onRefresh={() => {
            setRefreshing(true);
            data.refetch().then(() => setRefreshing(false));
          }}
          refreshing={refreshing}
        />
      </View>
    </>
  );
};

export default graphql(QUERY)(Scoreboard);

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row"
  },
  scoreBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80
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
    fontSize: 32
  },
  title: {
    color: colors.softWhite,
    fontWeight: "700",
    fontSize: 18
  },
  header: {
    color: "$primary",
    fontSize: "$large",
    fontWeight: "700",
    marginTop: 20
  }
});
