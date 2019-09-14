import React from "react";
import { View, Linking } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import { Text, H1, H2, Title, Content } from "native-base";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const NoUser = ({}) => {
  return (
    <View style={styles.container}>
      <Content>
        <H1 bold style={styles.titleHeader}>
          It's time to play Apollo GQL Bowl!
        </H1>
        <Text style={{ marginLeft: 10 }}>
          To get started set your options in the settings menu. Click the gear
          icon or swipe from the right
        </Text>

        <Text style={styles.text}>
          The goal of this app is to show you how Apollo Client handles
          optimistic responses. Setting the server delay determines how long the
          mutations take to return. Then when you make an action you see the
          difference between the optimistic response and the server response
        </Text>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL(
              "https://www.apollographql.com/docs/react/features/optimistic-ui/"
            )
          }
        >
          <H1 bold style={[styles.titleHeader, { marginTop: 20 }]}>
            More Information
          </H1>
          <H2 bold style={[styles.header, { marginTop: 5 }]}>
            Apollo React: Optimistic UI
          </H2>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL("https://github.com/KennyHammerlund/apollogqlbowl")
          }
        >
          <H1 bold style={[styles.header, { marginTop: 5 }]}>
            Github: GQL BOWL
          </H1>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL("https://github.com/KennyHammerlund/gqlsummmitApi")
          }
        >
          <H1 bold style={[styles.header, { marginTop: 5 }]}>
            Github: GQL BOWL API
          </H1>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => Linking.openURL("http://web.stargazerllc.com/")}
        >
          <H1 bold style={[styles.header, { marginTop: 5 }]}>
            Stargazer Web Design & Marketing
          </H1>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => Linking.openURL("https://www.poolplayers.com/")}
        >
          <H1 bold style={[styles.header, { marginTop: 5 }]}>
            American Poolplayers Association
          </H1>
        </TouchableWithoutFeedback>
      </Content>
    </View>
  );
};

export default NoUser;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$white",
    padding: 20,
    height: "100%"
  },
  header: {
    color: "$red",
    fontSize: "$medium",
    fontWeight: "700",
    marginLeft: 10
  },
  titleHeader: {
    color: "$primary",
    fontSize: "$large",
    fontWeight: "700"
  },
  text: {
    marginTop: 5,
    marginLeft: 10
  },
  linkBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
