import React from "react";
import BLOCKED_KICK from "../../assets/blockedKick.png";
import SAFTEY from "../../assets/saftey.jpg";
import FALSE_START from "../../assets/falseStart.jpeg";
import PASSING from "../../assets/passing.png";
import GQLBOWL from "../../assets/gqlbowl.png";
import TOUCHDOWN0 from "../../assets/optimized/touchdown_bo.png";
import TOUCHDOWN1 from "../../assets/optimized/touchdown_al.png";
import TOUCHDOWN2 from "../../assets/optimized/touchdown_bruce.png";

const IMAGES = {
  touchdown: [TOUCHDOWN0, TOUCHDOWN1, TOUCHDOWN2],
  falseStart: FALSE_START,
  passing: PASSING,
  gqlbowl: GQLBOWL,
  saftey: SAFTEY,
  blockedKick: BLOCKED_KICK
};

// prettier-ignore
export const ImageContext = React.createContext({});

class BaseProvider extends React.Component {
  state = { image: IMAGES.gqlbowl, lastIndex: 0 };
  imageReset = null;

  resetImage = () => {
    clearTimeout(this.imageReset);
    this.imageReset = setTimeout(() => {
      this.setState({ image: IMAGES.gqlbowl });
    }, 4000);
  };
  changePhoto = photo => {
    if (!photo) {
      //set a random image
      const imgArr = Object.keys(IMAGES).map(key => IMAGES[key]);
      const index = Math.floor(Math.random() * imgArr.length - 1);
      this.setState({ image: imgArr[index] });
      this.resetImage();
      return;
    }
    let image;
    if (photo === "touchdown") {
      const { lastIndex } = this.state;
      const newIndex = lastIndex === 2 ? 0 : lastIndex + 1;
      this.setState({ image: IMAGES.touchdown[newIndex], lastIndex: newIndex });
      this.resetImage();
    } else {
      image = IMAGES[photo];
      if (image) {
        this.setState({ image });
        this.resetImage();
      }
    }
  };

  render() {
    const injectableProps = { ...this.state, changePhoto: this.changePhoto };

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
      {ImageContextProps => <Component {...props} image={ImageContextProps} />}
    </ImageContext.Consumer>
  );
};

export default { Consumer: ImageContext.Consumer, Provider };
