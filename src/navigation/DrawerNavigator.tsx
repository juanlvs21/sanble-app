import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {primary} from '@/constants/Colors';
import {StackNavigatior} from '@/navigation/StackNavigatior';
import {DrawerContent} from '@/components/common/DrawerContent';
import {useAuth} from '@/hooks/useAuth';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {user} = useAuth();

  return (
    <Drawer.Navigator
      initialRouteName="Screens"
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerStyle: {
          width: 220,
          backgroundColor: primary[500],
        },
      }}
      drawerContent={props => <DrawerContent user={user} {...props} />}>
      <Drawer.Screen name="Screens" component={StackNavigatior} />
    </Drawer.Navigator>
  );
};
