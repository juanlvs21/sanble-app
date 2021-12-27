import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Icon, View} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import {InputField} from './Input';

type SearchProps = {
  /**
   * Style container
   */
  style?: StyleProp<ViewStyle> | undefined;
};

export const Search: React.FC<SearchProps> = ({style}) => {
  return (
    <View style={style}>
      <InputField
        InputRightElement={
          <Icon
            as={<Feather name="search" />}
            size={5}
            mr="4"
            color="muted.500"
          />
        }
        placeholder="Buscar Ferias, Stands, etc..."
        isFullWidth
      />
    </View>
  );
};
