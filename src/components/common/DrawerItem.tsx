import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {DrawerItem as DrawerItemBase} from '@react-navigation/drawer';

// import {primary} from '@/constants/Colors';

export type ComponentProps = {
  /**
   * Drawer item label
   */
  label: string;
  /**
   * Drawer item icon
   */
  icon: (props: {
    focused: boolean;
    size: number;
    color: string;
  }) => React.ReactElement;
  /**
   * Callback on press
   */
  onPress: () => void;
  /**
   * Drawer item active
   */
  focused?: boolean;
};

export const DrawerItem: React.FC<ComponentProps> = ({
  label,
  icon,
  onPress,
  focused,
}) => (
  <DrawerItemBase
    label={() => <Text style={styles.item}>{label}</Text>}
    onPress={onPress}
    icon={icon}
    focused={focused}
  />
);

const styles = StyleSheet.create({
  item: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
