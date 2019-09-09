import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Dimensions } from "react-native";

import Drawer from "../drawer";
import HomeScreen from "../homeScreen";
import colors from "../theme";

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    contentComponent: Drawer,
    drawerPosition: "right",
    drawerWidth: Dimensions.get("screen").width * 0.9
  }
);

export default createAppContainer(DrawerNavigator);
