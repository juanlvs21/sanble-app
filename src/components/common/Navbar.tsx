import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ViewStyle,
  StyleSheet,
  RegisteredStyle,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {primary, gray} from '@/constants/Colors';
import {useAuth} from '@/hooks/useAuth';
import {TRouteParamsNavbar} from '@/types/navigator';
import {logo, noAvatar} from '@/helpers/images';

export type ComponentProps = {
  /**
   * Style Navbar container
   */
  style?:
    | RegisteredStyle<ViewStyle>
    | Animated.Value
    | Animated.AnimatedInterpolation
    | Animated.WithAnimatedObject<ViewStyle>;
};

export const Navbar: React.FC<ComponentProps> = ({style}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = useAuth();

  const {navbarMap, title}: TRouteParamsNavbar = route?.params || {};
  const navbarTitle = title || 'Sanble';

  return (
    <Animated.View style={[styles.navbar, style]}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image
          source={user ? noAvatar : logo}
          style={styles.avatar}
          resizeMode={user ? 'cover' : 'contain'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{navbarTitle}</Text>
      <View>
        {!navbarMap ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Notifications')}>
            <Feather name="bell" size={25} color="black" />
          </TouchableOpacity>
        ) : null}
        {navbarMap ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Search map')}>
            <Feather name="search" size={25} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontWeight: '600',
    fontSize: 35,
    color: primary[500],
    marginHorizontal: 20,
    marginVertical: 10,
  },
  button: {
    backgroundColor: gray[500],
    width: 45,
    height: 45,
    borderRadius: 42,
    padding: 10,
  },
});
