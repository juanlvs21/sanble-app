import React from 'react';
import {ColorSchemeName} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabNavigator} from '@/navigation/BottomNavigator';

import {PromotionListScreen} from '@/screens/promotions/List';
import {FairDetailsScreen} from '@/screens/fairs/Details';
import {StandDetailsScreen} from '@/screens/stands/Details';
import ModalScreen from '@/screens/ModalScreen';
import NotFoundScreen from '@/screens/NotFoundScreen';

import LinkingConfiguration from '@/navigation/LinkingConfiguration';
import {RootStackParamList} from '@/types/navigator';

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
    linking={LinkingConfiguration}
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <RootNavigator />
  </NavigationContainer>
);

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Root"
      component={BottomTabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="FairDetails"
      component={FairDetailsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="StandDetails"
      component={StandDetailsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PromotionList"
      component={PromotionListScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="NotFound"
      component={NotFoundScreen}
      options={{title: 'Oops!'}}
    />
    <Stack.Group screenOptions={{presentation: 'modal'}}>
      <Stack.Screen name="Modal" component={ModalScreen} />
    </Stack.Group>
  </Stack.Navigator>
);
