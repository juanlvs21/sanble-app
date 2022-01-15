import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {BottomTabNavigator} from '@/navigation/BottomNavigator';
import {Empty} from '@/screens/Empty';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeDrawer">
      <Drawer.Screen name="HomeDrawer" component={BottomTabNavigator} />
      <Drawer.Screen name="MySanble" component={Empty} />
      <Drawer.Screen name="Favorites" component={Empty} />
      <Drawer.Screen name="NearYou" component={Empty} />
      <Drawer.Screen name="Messages" component={Empty} />
      <Drawer.Screen name="Profile" component={Empty} />
    </Drawer.Navigator>
  );
};
