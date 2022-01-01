/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import {LinkingOptions} from '@react-navigation/native';
// import * as Linking from 'expo-linking';

import {RootStackParamList} from '@/types/navigator';

const linking: LinkingOptions<RootStackParamList> = {
  // prefixes: [Linking.makeUrl('/')],
  prefixes: ['/'],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              TabOneScreen: 'Home',
            },
          },
          Fairs: {
            screens: {
              TabTwoScreen: 'Fairs',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
