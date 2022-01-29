import React from 'react';
import {Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import {gray, primary} from '@/constants/Colors';

export type ComponentProps = {
  /**
   * Is favorite
   */
  isFavorite: boolean;
};

export const BtnFavorite: React.FC<ComponentProps> = ({isFavorite}) => (
  <Button
    background={isFavorite ? primary[500] : gray[700]}
    variant="solid"
    width={9}
    height={9}
    borderRadius={99999}
    padding={0}>
    <Feather name="heart" size={20} color={gray[500]} />
  </Button>
);
