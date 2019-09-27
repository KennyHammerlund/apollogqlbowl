import React, { useEffect, useState } from "react";
import { Animated, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { withTouchdownContext } from "../../../contexts/touchdownContext";
import SingleBox from "./SingleBox";

const ServerReturn = ({ touchdown }) => {
  useEffect(() => {}, [touchdown.server]);
  return (
    <>
      {Object.keys(touchdown.server).map(key => {
        const text = touchdown.server[key];
        return (
          <SingleBox
            key={`${key}-${text}`}
            text={text}
            timestamp={key}
            onAnimationEnd={() => touchdown.removeServerReturn(key)}
          />
        );
      })}
    </>
  );
};

export default withTouchdownContext(ServerReturn);
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
