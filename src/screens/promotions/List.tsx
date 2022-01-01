import React from 'react';
import {View, Text} from 'native-base';
import {useRoute} from '@react-navigation/native';

import {TRoute} from '@/types/navigator';
import {TProductType} from '@/types/product';

export const PromotionListScreen: React.FC = () => {
  const {
    params: {type},
  } = useRoute<TRoute<{type: TProductType}>>();

  return (
    <View>
      <Text>Lista de promociones: {type}</Text>
    </View>
  );
};
