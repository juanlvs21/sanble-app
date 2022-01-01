import React from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'native-base';

import {height, width} from '../constants/Layout';

type ComponentProps = {
  /**
   * Component refresh control
   */
  renderRefreshControl?: React.ReactElement;
  /**
   * Infinite scroll
   */
  infiniteScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export const MainLayout: React.FC<ComponentProps> = ({
  children,
  renderRefreshControl,
  infiniteScroll,
}) => {
  return (
    <ImageBackground
      source={require('../assets/images/wave-main.png')}
      resizeMode="cover"
      style={styles.main}>
      <ScrollView
        refreshControl={renderRefreshControl}
        onScroll={infiniteScroll}>
        {children}
      </ScrollView>
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
