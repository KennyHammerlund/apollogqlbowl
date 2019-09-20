import React, {useEffect} from "react";
import { FlatList, View } from "react-native";
import { H2 } from "native-base";
import { useQuery } from "@apollo/react-hooks";
import EStyleSheet from "react-native-extended-stylesheet";

import ListItem from "./ListItem";
import GET_VIEWER from "../apollo/queries/viewer";

export default ({}) => {
  const { data, loading, error } = useQuery(GET_VIEWER);
  useEffect(()=>{},[data, loading]) // rerenders component on data change from apollo
  if (loading) return <></>;
  const { viewer } = data || {};
  const { actions } = viewer || {};
  return (
    <View style={styles.container}>
      <H2 style={styles.header}>Score History</H2>
      <FlatList
        data={actions.reverse()}
        style={{ paddingTop: 5, flex: -1, flexGrow: 0 }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  header: {
    color: "$primary",
    fontSize: "$large",
    fontWeight: "700",
    marginTop: 20
  },
  container: {
    flex: 1
  }
});
