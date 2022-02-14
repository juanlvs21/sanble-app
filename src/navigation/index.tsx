import React from 'react';
import {ColorSchemeName} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import {DrawerNavigator} from '@/navigation/DrawerNavigator';

export type ComponentProps = {
  /**
   * App color Scheme
   *
   * @default "light"
   */
  colorScheme?: ColorSchemeName;
};

export const Navigation: React.FC<ComponentProps> = ({
  colorScheme = 'light',
}) => (
  <NavigationContainer
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <DrawerNavigator />
  </NavigationContainer>
);
