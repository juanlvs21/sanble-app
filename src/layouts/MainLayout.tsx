import React from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'native-base';

import {height, width} from '@/constants/Layout';
import {Navbar} from '@/components/common/Navbar';

export type ComponentProps = {
  /**
   * Component refresh control
   */
  renderRefreshControl?: React.ReactElement;
  /**
   * Infinite scroll
   */
  infiniteScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /**
   * Horizontal padding that will have the content (children)
   *
   * @default 20
   */
  contentPaddingHorizontal?: number;
};

export const MainLayout: React.FC<ComponentProps> = ({
  children,
  renderRefreshControl,
  infiniteScroll,
  contentPaddingHorizontal = 20,
}) => (
  <>
    <Navbar />
    <ImageBackground
      source={require('../assets/images/wave-main.png')}
      resizeMode="cover"
      style={[styles.main, {paddingHorizontal: contentPaddingHorizontal}]}>
      <ScrollView
        refreshControl={renderRefreshControl}
        onScroll={infiniteScroll}>
        {children}
      </ScrollView>
    </ImageBackground>
  </>
);

const styles = StyleSheet.create({
  main: {
    width,
    height,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
});
