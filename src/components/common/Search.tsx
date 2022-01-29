import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Icon, View} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import {InputField} from '@/components/common/Input';

export type SearchProps = {
  /**
   * Style container
   */
  style?: StyleProp<ViewStyle> | undefined;
  /**
   * Placeholder
   *
   * @default "Buscar..."
   */
  placeholder?: string;
};

export const Search: React.FC<SearchProps> = ({
  style,
  placeholder = 'Buscar...',
}) => {
  return (
    <View style={[style, styles.searchContainer]}>
      <InputField
        InputRightElement={
          <Icon
            as={<Feather name="search" />}
            size={5}
            mr="4"
            color="muted.500"
          />
        }
        placeholder={placeholder}
        isFullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 20,
  },
});
