/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import {LinkingOptions} from '@react-navigation/native';
// import * as Linking from 'expo-linking';

import {RootStackParamList} from '../types/navigator';

const linking: LinkingOptions<RootStackParamList> = {
  // prefixes: [Linking.makeUrl('/')],
  prefixes: ['/'],
  config: {
    screens: {
      Root: {
        screens: {
          home: {
            screens: {
              TabOneScreen: 'home',
            },
          },
          fairs: {
            screens: {
              TabTwoScreen: 'fairs',
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
