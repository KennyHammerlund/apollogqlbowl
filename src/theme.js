import EStyleSheet from "react-native-extended-stylesheet";

const blue = "#0061AA";
const red = "#ee3a43";
const softWhite = "#f9f9f9";
const black = "#4c5667";
const muted = "#98a6ad";
const darkGrey = "#777";
const lightGrey = "#D8D8D8";
const backgroundAccent = "#202020";
const background = "#2e2e2e";

EStyleSheet.build({
  $primary: blue,
  $white: softWhite,
  $small: ".7rem",
  $medium: ".8rem",
  $large: "1.2rem",
  $jumbo: "2rem",
  $superJumbo: "3rem",
  $background: background,
  $backgroundAccent: backgroundAccent,
  $shadowColor: "#444",
  $lightGrey: lightGrey,
  $text: softWhite,
  $subTitle: "#333",
  $error: red,
  $muted: muted
});

export default {
  primary: blue,
  secondary: red,
  softWhite,
  black,
  muted,
  darkGrey,
  lightGrey,
  red,
  background,
  backgroundAccent
};
