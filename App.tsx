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
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
// import { StatusBar } from "expo-status-bar";

import {Navigation} from './src/navigation';
import {store} from './src/store';
import {theme} from './src/theme';
import {useCachedResources} from './src/hooks/useCachedResources';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NativeBaseProvider theme={theme}>
            <Navigation />
            {/* <StatusBar /> */}
          </NativeBaseProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
