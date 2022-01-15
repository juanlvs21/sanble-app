import React from 'react';
import {ColorSchemeName} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabNavigator} from '@/navigation/BottomNavigator';
import {Empty} from '@/screens/Empty';
import {PromotionListScreen} from '@/screens/promotions/List';
import {FairDetailsScreen} from '@/screens/fairs/Details';
import {StandDetailsScreen} from '@/screens/stands/Details';
import ModalScreen from '@/screens/ModalScreen';
import NotFoundScreen from '@/screens/NotFoundScreen';
import {RootStackParamList} from '@/types/navigator';

export type ComponentProps = {
  /**
   * App color Scheme
   *
   * @default "light"
   */
  colorScheme?: ColorSchemeName;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigatior: React.FC = () => (
  <Stack.Navigator initialRouteName="Root">
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
      name="MySanble"
      component={Empty}
      options={{title: 'Mi Sanble', headerShown: false}}
    />
    <Stack.Screen
      name="Favorites"
      component={Empty}
      options={{title: 'Favoritos', headerShown: false}}
    />
    <Stack.Screen
      name="NearYou"
      component={Empty}
      options={{title: 'Cerca de ti', headerShown: false}}
    />
    <Stack.Screen
      name="Messages"
      component={Empty}
      options={{title: 'Oops!', headerShown: false}}
    />
    <Stack.Screen
      name="Profile"
      component={Empty}
      options={{title: 'Perfil', headerShown: false}}
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
