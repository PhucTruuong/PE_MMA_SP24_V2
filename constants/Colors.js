const tintColorLight = "yellow";
const tintColorDark = "#fff";
const defaultColor = "blue";

export default {
  light: {
    defaultColor: defaultColor,
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    defaultColor: defaultColor,
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
