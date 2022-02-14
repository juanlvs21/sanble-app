import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {primary} from '@/constants/Colors';
import {DrawerContent} from '@/components/common/DrawerContent';
import {BottomTabNavigator} from '@/navigation/BottomNavigator';
import {FairDetailsScreen} from '@/screens/fairs/Details';
import {StandDetailsScreen} from '@/screens/stands/Details';
import {PromotionListScreen} from '@/screens/promotions/List';
import {Empty} from '@/screens/Empty';
import {useAuth} from '@/hooks/useAuth';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {user} = useAuth();

  return (
    <Drawer.Navigator
      initialRouteName="HomeBottomNav"
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
      <Drawer.Screen name="HomeBottomNav" component={BottomTabNavigator} />
      <Drawer.Screen
        name="MySanble"
        component={Empty}
        options={{title: 'Mi Sanble'}}
      />
      <Drawer.Screen
        name="Favorites"
        component={Empty}
        options={{title: 'Favoritos'}}
      />
      <Drawer.Screen
        name="NearYou"
        component={Empty}
        options={{title: 'Cerca de ti'}}
      />
      <Drawer.Screen
        name="Messages"
        component={Empty}
        options={{title: 'Oops!'}}
      />
      <Drawer.Screen
        name="Profile"
        component={Empty}
        options={{title: 'Perfil'}}
      />
      {/* Other Screens */}
      <Drawer.Screen name="FairDetails" component={FairDetailsScreen} />
      <Drawer.Screen name="StandDetails" component={StandDetailsScreen} />
      <Drawer.Screen name="PromotionList" component={PromotionListScreen} />
    </Drawer.Navigator>
  );
};
