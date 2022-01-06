import React from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'native-base';

import {height, width} from '@/constants/Layout';
import {Navbar} from '@/components/common/Navbar';

type ComponentProps = {
  /**
   * Component refresh control
   */
  renderRefreshControl?: React.ReactElement;
  /**
   * Infinite scroll
   */
  infiniteScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /**
   * If true, the layout will have a background image
   *
   * @default true
   */
  withImageBackground?: boolean;
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
  withImageBackground = true,
  contentPaddingHorizontal = 20,
}) =>
  withImageBackground ? (
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
  ) : (
    <>
      <Navbar />
      <View
        style={[styles.main, {paddingHorizontal: contentPaddingHorizontal}]}>
        <ScrollView
          refreshControl={renderRefreshControl}
          onScroll={infiniteScroll}>
          {children}
        </ScrollView>
      </View>
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
