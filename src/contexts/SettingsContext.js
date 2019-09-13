import React from "react";
import { setEmail as setStorageEmail, deleteEmail } from "../utils/storage";
import { ActivityIndicator } from "react-native";

// prettier-ignore
export const SettingsContext = React.createContext({});

class BaseProvider extends React.Component {
  state = {
    user: undefined,
    delay: undefined,
    optimistic: undefined
  };

  updateSettings = async (user, delay, optimistic) => {
    this.setState({ optimistic });
    await setStorageEmail(user);
    // TODO Set up mutation to set settings up.
    // Then move to the login screen
    // mutateDelay({ variables: { input: delay } }).then(console.log);
  };

  resetSettings = async () => {
    await setStorageEmail("");
    this.setState({ user: undefined, delay: undefined, optimistic: undefined });
    // mutateDelay({ variables: { input: 0 } }).then(console.log);
  };

  render() {
    const injectableProps = {
      updateSettings: this.updateSettings,
      resetSettings: this.resetSettings,
      optimistic: this.state.optimistic
    };

    return (
      <SettingsContext.Provider value={injectableProps}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}
const Provider = BaseProvider;

export const withSettingsContext = Component => props => {
  return (
    <SettingsContext.Consumer>
      {SettingsContextProps => (
        <Component {...props} settings={SettingsContextProps} />
      )}
    </SettingsContext.Consumer>
  );
};

export default { Consumer: SettingsContext.Consumer, Provider };
