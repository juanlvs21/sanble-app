import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

import {height, width} from '../constants/Layout';

export const MainLayout: React.FC = ({children}) => {
  return (
    <ImageBackground
      source={require('../assets/images/wave-main.png')}
      resizeMode="cover"
      style={styles.main}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    width,
    height,
    backgroundColor: '#fff',
    padding: 20,
  },
});
