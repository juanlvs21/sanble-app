import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {primary, gray} from '@/constants/Colors';
import {TRouteParamsNavbar} from '@/types/navigator';

type ComponentProps = {
  /**
   * Title screen
   */
};

export const Navbar: React.FC = () => {
  const route = useRoute();
  const {navbarMap, title}: TRouteParamsNavbar = route?.params || {};
  const navbarTitle = title || 'Sanble';

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>{navbarTitle}</Text>
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
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
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
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
  },
});
