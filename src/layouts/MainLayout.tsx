import React, {useEffect, useRef} from 'react';
import {
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
  StyleSheet,
} from 'react-native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {ScrollView} from 'native-base';

import {height, width} from '@/constants/Layout';
import {primary} from '@/constants/Colors';
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
   * @default 25
   */
  contentPaddingHorizontal?: number;
};

export const MainLayout: React.FC<ComponentProps> = ({
  children,
  renderRefreshControl,
  infiniteScroll,
  contentPaddingHorizontal = 25,
}) => {
  const isOpen = useDrawerStatus();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const borderRadiusValue = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: isOpen === 'open' ? 0.9 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(borderRadiusValue, {
        toValue: isOpen === 'open' ? 20 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYValue, {
        toValue: isOpen === 'open' ? -20 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {transform: [{scale: scaleValue}, {translateY: translateYValue}]},
        ]}>
        <View>
          <Navbar style={{borderTopLeftRadius: borderRadiusValue}} />
          <Animated.Image
            source={require('../assets/images/wave-main.png')}
            resizeMode="cover"
            style={[
              styles.background,
              {borderBottomLeftRadius: borderRadiusValue},
            ]}
          />
          <ScrollView
            refreshControl={renderRefreshControl}
            onScroll={infiniteScroll}
            style={[
              styles.scollView,
              {paddingHorizontal: contentPaddingHorizontal},
            ]}>
            {children}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary[500],
  },
  background: {
    backgroundColor: '#fff',
    height,
    width,
  },
  scollView: {
    position: 'absolute',
    paddingVertical: 20,
    flex: 1,
    top: 78,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: '#FFF',
  },
});
