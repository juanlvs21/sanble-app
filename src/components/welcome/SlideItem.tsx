import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {View} from 'native-base';

import {width, height} from '@/constants/Layout';
import {secondary} from '@/constants/Colors';
import {TWelcomeSlides} from '@/types/welcome';

export type ComponentProps = {
  /**
   * Item swipe
   */
  item: TWelcomeSlides;
  /**
   * Current index Flatlist
   */
  currentIndex: number;
};

export const WelcomeSlideItem: React.FC<ComponentProps> = ({
  item,
  currentIndex,
}) => {
  const bgUp2Animation = useRef(new Animated.Value(height)).current;
  const bgOpacity2Animation = useRef(new Animated.Value(0)).current;
  const imgScaleAnimation = useRef(new Animated.Value(0)).current;
  const textOpacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (item.index === currentIndex) {
      Animated.parallel([
        Animated.timing(bgUp2Animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bgOpacity2Animation, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(imgScaleAnimation, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacityAnimation, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(bgUp2Animation, {
          toValue: height,
          useNativeDriver: true,
        }),
        Animated.timing(bgOpacity2Animation, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(imgScaleAnimation, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacityAnimation, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, currentIndex]);

  return (
    <View>
      <View style={styles.waveContainer}>
        <Animated.Image source={item.bg1} style={[styles.wave, styles.wave1]} />
        <Animated.Image
          source={item.bg2}
          style={[
            styles.wave,
            {
              top: item.bg2Top || 200,
              opacity: bgOpacity2Animation,
              transform: [{translateY: bgUp2Animation}],
            },
          ]}
        />
      </View>
      <View style={[styles.content]}>
        <Animated.Image
          source={item.image}
          style={[
            styles.illustration,
            {
              transform: [{scale: imgScaleAnimation}],
            },
          ]}
        />
        <Animated.Text style={[styles.title, {opacity: textOpacityAnimation}]}>
          {item.title}
        </Animated.Text>
        {item.description ? (
          <Animated.Text
            style={[styles.description, {opacity: textOpacityAnimation}]}>
            {item.description}
          </Animated.Text>
        ) : null}
        {item.buttons ? (
          <Animated.View
            style={[styles.btnContainer, {opacity: textOpacityAnimation}]}>
            {item.buttons}
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 30,
    width,
  },
  waveContainer: {
    width,
    height,
    position: 'relative',
  },
  wave: {
    resizeMode: 'cover',
    position: 'absolute',
    width,
  },
  wave1: {
    height,
    top: 0,
  },
  illustration: {
    width: 350,
    height: 350,
    marginTop: 20,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: '700',
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 50,
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 15,
    color: secondary[100],
    fontWeight: '500',
  },
  btnContainer: {
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
  },
});
