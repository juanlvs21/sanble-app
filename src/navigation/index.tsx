import React from 'react';
import {ColorSchemeName} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabNavigator} from '@/navigation/BottomNavigator';
import {Drawer} from '@/components/common/Drawer';
import {PromotionListScreen} from '@/screens/promotions/List';
import {FairDetailsScreen} from '@/screens/fairs/Details';
import {StandDetailsScreen} from '@/screens/stands/Details';
import ModalScreen from '@/screens/ModalScreen';
import NotFoundScreen from '@/screens/NotFoundScreen';
import {Empty} from '@/screens/Empty';
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

export const DrawerBottomNavigator: React.FC = () => (
  <Drawer>
    <BottomTabNavigator />
  </Drawer>
);

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Root"
      component={DrawerBottomNavigator}
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
      name="MySanble"
      component={Empty}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Favorites"
      component={Empty}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="NearYou"
      component={Empty}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Profile"
      component={Empty}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Messages"
      component={Empty}
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
