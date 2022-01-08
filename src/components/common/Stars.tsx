import React from 'react';
import {ColorValue, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {primary} from '@/constants/Colors';

export type ComponentProps = {
  /**
   * Number stars (min:0, max:5)
   */
  stars: number;
  /**
   * Star size
   *
   * @default 18
   */
  size?: number;
  /**
   * Star color
   */
  color?: ColorValue;
  /**
   * Space between stars
   *
   * @default 2
   */
  spacing?: number;
  /**
   * Style container
   */
  style?: StyleProp<ViewStyle>;
};

export const Stars: React.FC<ComponentProps> = ({
  stars,
  size = 18,
  spacing = 2,
  color = primary[500],
  style,
}) => (
  <View style={[styles.container, style]}>
    <AntDesign
      name={stars > 0 ? 'star' : 'staro'}
      color={color}
      size={size}
      style={{marginRight: spacing}}
    />
    <AntDesign
      name={stars > 1 ? 'star' : 'staro'}
      color={color}
      size={size}
      style={{marginRight: spacing}}
    />
    <AntDesign
      name={stars > 2 ? 'star' : 'staro'}
      color={color}
      size={size}
      style={{marginRight: spacing}}
    />
    <AntDesign
      name={stars > 3 ? 'star' : 'staro'}
      color={color}
      size={size}
      style={{marginRight: spacing}}
    />
    <AntDesign
      name={stars > 4 ? 'star' : 'staro'}
      color={color}
      size={size}
      style={{marginRight: spacing}}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
