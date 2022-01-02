import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';

import {width, height} from '@/constants/Layout';
import {primary} from '@/constants/Colors';

type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
  /**
   * Loading (show splash)
   */
  loading: boolean;
};

export const Splash: React.FC<ComponentProps> = ({children, loading}) => {
  const pulseAnimation = useRef(new Animated.Value(0)).current;
  const startAnimation = useRef(new Animated.Value(0)).current;
  const contentTransition = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -(height + 50),
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <View style={styles.absolute}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: startAnimation}],
          },
        ]}>
        <Animated.View style={styles.content}>
          <Animated.Image
            source={require('@/assets/images/logo.png')}
            style={[
              styles.logo,
              loading ? {transform: [{scale: pulseAnimation}]} : {},
            ]}
          />
          <Text style={styles.subtitle}>Bienvenido a</Text>
          <Text style={styles.title}>Sanble</Text>
          <Image
            source={require('@/assets/images/wave-footer.png')}
            style={styles.wave}
          />
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          styles.absolute,
          styles.children,
          {
            transform: [{translateY: contentTransition}],
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 140,
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 45,
    fontWeight: '600',
    color: primary[500],
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: primary[500],
    marginTop: 22,
    letterSpacing: 4,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    width,
  },
  children: {
    backgroundColor: '#FFF',
    zIndex: 0,
  },
});
