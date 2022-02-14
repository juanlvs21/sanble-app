import React, {useEffect, useRef} from 'react';
import {Animated, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export const SimpleLayout: React.FC = ({children}) => {
  const isFocused = useIsFocused();
  const opacityValue = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: isFocused ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYValue, {
        toValue: isFocused ? 0 : 20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Animated.View
      style={{
        opacity: opacityValue,
        transform: [{translateY: translateYValue}],
      }}>
      <ScrollView>{children}</ScrollView>
    </Animated.View>
  );
};
