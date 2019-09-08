import React from "react";
import {
  View,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform
} from "react-native";
import colors from "../theme";
import { isIphoneX } from "../utils/isIPhoneX";

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? (isIphoneX() ? 44 : 20) : RNStatusBar.currentHeight;

const StatusBar = ({}) => {
  return (
    <>
      <RNStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000000"
      />
      <View style={styles.statusBar} />
    </>
  );
};

export default StatusBar;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    color: colors.softWhite,
    backgroundColor: `#000000`
  }
});
