import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

import {MainTabBar} from '@/components/common/MainTabBar';
import {HomeScreen} from '@/screens/Home';
import {FairsListScreen} from '@/screens/fairs/List';
import {StandsListScreen} from '@/screens/stands/List';

import {RootTabParamList} from '@/types/navigator';

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
      tabBarPosition="bottom"
      tabBar={props => <MainTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{title: 'Sanble'}}
        options={{
          tabBarIcon: props => <Feather name="home" size={25} {...props} />,
        }}
      />
      <Tab.Screen
        name="Fairs"
        component={FairsListScreen}
        initialParams={{title: 'Ferias'}}
        options={{
          tabBarIcon: props => (
            <MaterialCommunityIcons
              name="storefront-outline"
              size={25}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stands"
        component={StandsListScreen}
        initialParams={{title: 'Stands'}}
        options={{
          tabBarIcon: props => (
            <MaterialCommunityIcons
              name="shopping-outline"
              size={25}
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
