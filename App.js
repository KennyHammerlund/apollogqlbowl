import AppNavigator from "./src/navigators/Drawer";

import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StatusBar from "./src/components/StatusBar";
import colors from "./src/theme";
import getTheme from "./native-base-theme/components";
import { StyleProvider } from "native-base";
import material from "./native-base-theme/variables/material";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "./src/apollo/apollo";
import { registerRootComponent } from "expo";
import ImageContext from "./src/contexts/imageContext";
import TouchdownContext from "./src/contexts/touchdownContext";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return <AppNavigator />;
  }
}

const App = () => (
  <ApolloProvider client={ApolloClient}>
    <View style={{ backgroundColor: colors.softWhite, flex: 1 }}>
      <StyleProvider style={getTheme(material)}>
        <ImageContext.Provider>
          <TouchdownContext.Provider>
            <>
              <StatusBar />
              <AppContainer />
            </>
          </TouchdownContext.Provider>
        </ImageContext.Provider>
      </StyleProvider>
    </View>
  </ApolloProvider>
);

// export default App;
registerRootComponent(App);
