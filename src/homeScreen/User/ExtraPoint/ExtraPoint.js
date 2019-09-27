import React, { useEffect, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { Text, Button, H3 } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import { withTouchdownContext } from "../../../contexts/touchdownContext";

const getStartStop = () => {
  const halfScreen = Dimensions.get("screen").width / 2;
  return { open: 0, close: -halfScreen };
};

const ExtraPoint = ({ touchdown }) => {
  const [animatedValue, setAnimatedValue] = useState(
    new Animated.Value(getStartStop().close)
  );
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: getStartStop()[touchdown.ui ? "open" : "close"],
      useNativeDriver: true
    }).start();
  }, [touchdown]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: animatedValue }] }]}
    >
      <H3 style={styles.title}>Touchdown!</H3>
      <Button
        style={[styles.button, styles.ui]}
        onPress={() => {
          // TODO: Mutation to add extra point kick and kick image
          touchdown.toggleUI();
        }}
      >
        <Text>{"Kick Extra Point"}</Text>
      </Button>
    </Animated.View>
  );
};

export default withTouchdownContext(ExtraPoint);

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignContent: "center"
  },
  title: {
    color: "$white",
    fontWeight: "700",
    marginBottom: 5,
    width: "100%",
    textAlign: "center"
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
