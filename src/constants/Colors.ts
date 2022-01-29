const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const primary = {
  50: '#ffc39a',
  100: '#ffb685',
  200: '#ffaa71',
  300: '#ff9e5d',
  400: '#ff9248',
  500: '#ff8634',
  600: '#e6792f',
  700: '#cc6b2a',
  800: '#b35e24',
  900: '#99501f',
};
export const secondary = {
  50: '#9d9a9a',
  100: '#898686',
  200: '#757272',
  300: '#615d5d',
  400: '#4e4949',
  500: '#3a3535',
  600: '#343030',
  700: '#2e2a2a',
  800: '#292525',
  900: '#232020',
};
export const gray = {
  50: '#fffff',
  100: '#fefefe',
  200: '#fdfdfd',
  300: '#fcfcfc',
  400: '#fbfbfb',
  500: '#fafafa',
  600: '#e1e1e1',
  700: '#c8c8c8',
  800: '#969696',
  900: '#7d7d7d',
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

// https://maketintsandshades.com/
