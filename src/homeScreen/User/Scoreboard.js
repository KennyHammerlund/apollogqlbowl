import React, { useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Text, H2 } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import { graphql } from "react-apollo";

import colors from "../../theme";
import QUERY from "./getGame";
import ListItem from "./ListItem";

const Scoreboard = ({ data }) => {
  const [refreshing, setRefreshing] = useState(false);
  if (data.loading) return <ActivityIndicator size="large" color="#0061aa" />;

  const { game } = data;
  const { actions } = game || {};

  const score = actions
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
          <View style={styles.scoreBox}>
            <Text style={styles.title}>Server</Text>
            <Text style={styles.score}>{score}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.title}>UI</Text>
            <Text style={styles.score}>{score}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <H2 style={styles.header}>Score History</H2>
        <FlatList
          data={actions}
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
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80
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
