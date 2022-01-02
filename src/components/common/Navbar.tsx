import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import Feather from 'react-native-vector-icons/Feather';

import {primary, gray} from '@/constants/Colors';

export const Navbar: React.FC<BottomTabHeaderProps> = ({
  //   navigation,
  route,
  options,
}) => {
  const title = getHeaderTitle(options, route.name) || 'Sanble';

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Notifications')}>
        <Feather name="bell" size={25} color="black" />
      </TouchableOpacity>
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
