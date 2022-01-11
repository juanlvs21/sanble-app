import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';

import {primary} from '@/constants/Colors';

export type ComponentProps = {
  /**
   * Drawer item label
   */
  label: string;
  /**
   * Drawer item icon
   */
  icon: React.ReactElement;
  /**
   * Callback on press
   */
  onPress: (event: GestureResponderEvent) => void;
  /**
   * Drawer item active
   */
  active?: boolean;
};

export const DrawerItem: React.FC<ComponentProps> = ({
  label,
  icon,
  onPress,
  active,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.item, active ? styles.itemActive : {}]}>
      {icon}
      <Text style={[styles.itemLabel, active ? styles.itemLabelActive : {}]}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingLeft: 20,
    marginBottom: 5,
    width: 180,
  },
  itemLabel: {
    marginLeft: 15,
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  itemActive: {
    backgroundColor: '#FFF',
  },
  itemLabelActive: {
    color: primary[600],
  },
});
