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
import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppProvider} from '@/context/app';
import {DataProvider} from '@/providers/DataProvider';

import {Navigation} from '@/navigation';
import {theme} from '@/theme';

const App: React.FC = () => (
  <SafeAreaProvider>
    <StatusBar animated={true} backgroundColor="#fff" />
    <AppProvider>
      <NativeBaseProvider theme={theme}>
        <DataProvider>
          <Navigation />
        </DataProvider>
      </NativeBaseProvider>
    </AppProvider>
  </SafeAreaProvider>
);

export default App;
