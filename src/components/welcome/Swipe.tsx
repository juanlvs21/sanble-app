import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';

import {width, height} from '@/constants/Layout';

export const WelcomeSwipe: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width,
    height,
  },
});
