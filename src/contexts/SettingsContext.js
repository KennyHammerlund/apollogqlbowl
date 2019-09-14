import React from "react";

// prettier-ignore
export const ImageContext = React.createContext({});

class BaseProvider extends React.Component {
  state = {
  };

  render() {
    const injectableProps = {};

    return (
      <ImageContext.Provider value={injectableProps}>
        {this.props.children}
      </ImageContext.Provider>
    );
  }
}
const Provider = BaseProvider;

export const withImageContext = Component => props => {
  return (
    <ImageContext.Consumer>
      {ImageContextProps => (
        <Component {...props} settings={ImageContextProps} />
      )}
    </ImageContext.Consumer>
  );
};

export default { Consumer: ImageContext.Consumer, Provider };
