import {extendTheme} from 'native-base';

import {primary, secondary} from '../constants/Colors';

export const theme = extendTheme({
  fontConfig: {
    Poppins: {
      400: {
        normal: 'Poppins-Regular',
      },
      500: {
        normal: 'Poppins-Medium',
      },
      600: {
        normal: 'Poppins-Bold',
      },
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
  colors: {
    primary,
    secondary,
  },
  config: {
    // Changing initialColorMode to 'light'
    initialColorMode: 'light',
  },
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        rounded: 20,
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Input: {
      baseStyle: {
        borderRadius: 20,
        borderColor: 'transparent',
        // backgroundColor: gray[500],
        paddingLeft: 5,
        paddingTop: 3,
      },
      defaultProps: {
        variant: 'outline',
        // placeholderTextColor: "#000",
      },
    },
  },
});
