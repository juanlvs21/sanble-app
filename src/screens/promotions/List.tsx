import React from 'react';
import {Text} from 'native-base';
import {useRoute} from '@react-navigation/native';

import {SimpleLayout} from '@/layouts/SimpleLayout';
import {TRoute} from '@/types/navigator';
import {TProductType} from '@/types/product';

export const PromotionListScreen: React.FC = () => {
  const {
    params: {type},
  } = useRoute<TRoute<{type: TProductType}>>();

  return (
    <SimpleLayout>
      <Text>Lista de promociones: {type}</Text>
    </SimpleLayout>
  );
};
