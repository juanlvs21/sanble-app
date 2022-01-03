/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
// import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {store} from '@/store';
import {DataProvider} from '@/providers/DataProvider';

import {Navigation} from '@/navigation';
import {theme} from '@/theme';

const App: React.FC = () => (
  <SafeAreaProvider>
    {/* <StatusBar animated={true} backgroundColor="#fff" /> */}
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <DataProvider>
          <Navigation />
        </DataProvider>
      </NativeBaseProvider>
    </Provider>
  </SafeAreaProvider>
);

export default App;
