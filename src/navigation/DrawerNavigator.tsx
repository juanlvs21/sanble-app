import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigatior} from '@/navigation/StackNavigatior';
import {DrawerContent} from '@/components/common/DrawerContent';
import {useAuth} from '@/hooks/useAuth';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {user} = useAuth();

  return (
    <Drawer.Navigator
      initialRouteName="Screens"
      screenOptions={{headerShown: false, drawerType: 'slide'}}
      drawerContent={props => <DrawerContent user={user} {...props} />}>
      <Drawer.Screen name="Screens" component={StackNavigatior} />
    </Drawer.Navigator>
  );
};
