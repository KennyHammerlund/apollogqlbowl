import React from "react";

// prettier-ignore
export const TouchdownContext = React.createContext({});

class BaseProvider extends React.Component {
  state = {
    ui: false,
    server: []
  };

  toggleUI = () => {
    this.setState({ ui: !this.state.ui });
  };

  addServerReturn = val => {
    const newServer = { ...this.state.server };
    newServer[val.timeStamp] = val.text;
    this.setState({ server: newServer });
  };
  
  removeServerReturn = timeStamp => {
    const newServer = { ...this.state.server };
    delete newServer[timeStamp];
    this.setState({
      server: newServer
    });
  };

  render() {
    const injectableProps = {
      toggleUI: this.toggleUI,
      addServerReturn: this.addServerReturn,
      removeServerReturn: this.removeServerReturn,
      ...this.state
    };

    return (
      <TouchdownContext.Provider value={injectableProps}>
        {this.props.children}
      </TouchdownContext.Provider>
    );
  }
}
const Provider = BaseProvider;

export const withTouchdownContext = Component => props => {
  return (
    <TouchdownContext.Consumer>
      {ImageContextProps => (
        <Component {...props} touchdown={ImageContextProps} />
      )}
    </TouchdownContext.Consumer>
  );
};

export default { Consumer: TouchdownContext.Consumer, Provider };
