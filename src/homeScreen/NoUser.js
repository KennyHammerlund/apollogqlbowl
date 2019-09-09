import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import { Text, H1, Title, Content } from "native-base";

const NoUser = ({}) => {
  return (
    <View style={styles.container}>
      <Content>
        <H1 bold style={styles.header}>
          It's time to play Apollo GQL Bowl!
        </H1>
        <Text>
          To get started set your options in the settings menu. Click the gear
          icon or swipe from the right
        </Text>
      </Content>
    </View>
  );
};

export default NoUser;

const styles = EStyleSheet.create({
  container: { flex: 1 },
  header: {
    color: "$primary",
    fontSize: "$large",
    fontWeight: "700"
  }
});
