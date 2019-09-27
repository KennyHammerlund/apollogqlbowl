import React, { useEffect, useState } from "react";
import { Animated, Dimensions, View } from "react-native";
import { Text, H3 } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment";

const getStartStop = () => {
  const halfScreen = Dimensions.get("screen").width / 2;
  return { open: 0, close: halfScreen };
};

export default ({ text, timestamp, onAnimationEnd }) => {
  const [animatedValue, setAnimatedValue] = useState(
    new Animated.Value(getStartStop().close)
  );
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: getStartStop().open,
      useNativeDriver: true
    }).start(() => {
      setTimeout(() => {
        Animated.spring(animatedValue, {
          toValue: getStartStop().close,
          useNativeDriver: true
        }).start(onAnimationEnd);
      }, 2000);
    });
  });
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: animatedValue }] }]}
    >
      <H3 style={styles.title}>Server:</H3>
      <View style={{ flexDirection: "row", alignContent: "flex-end" }}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.timestamp}>
          {moment(parseInt(timestamp)).format("hh:mm:ss")}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#000",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 5
  },
  title: {
    color: "$white",
    fontWeight: "500",
    fontSize: "1rem",
    width: "100%"
  },
  text: {
    color: "$white",
    fontSize: ".8rem",
    marginRight: 5
  },
  timestamp: {
    color: "$muted",
    fontSize: ".7rem"
  },
  button: {
    textAlign: "center",
    justifyContent: "center"
  },
  server: {
    backgroundColor: "$red"
  },
  ui: {
    backgroundColor: "$primary"
  }
});
