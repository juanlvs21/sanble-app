import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

import {Navbar} from '@/components/common/Navbar';
import {MainTabBar} from '@/components/common/MainTabBar';
import {HomeScreen} from '@/screens/Home';
import {NearYouScreen} from '@/screens/NearYou';
import {FairsListScreen} from '@/screens/fairs/List';
import {StandsListScreen} from '@/screens/stands/List';

import {RootTabParamList} from '@/types/navigator';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        header: props => <Navbar {...props} />,
      }}
      tabBar={props => <MainTabBar {...props} />}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: props => <Feather name="home" {...props} />,
        }}
      />
      <BottomTab.Screen
        name="NearYou"
        component={NearYouScreen}
        initialParams={{navbarMap: true}}
        options={{
          title: 'Cerca de ti',
          tabBarIcon: props => (
            <MaterialCommunityIcons name="map-search-outline" {...props} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Fairs"
        component={FairsListScreen}
        options={{
          title: 'Ferias',
          tabBarIcon: props => (
            <MaterialCommunityIcons name="storefront-outline" {...props} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stands"
        component={StandsListScreen}
        options={{
          title: 'Stands',
          tabBarIcon: props => (
            <MaterialCommunityIcons name="shopping-outline" {...props} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
