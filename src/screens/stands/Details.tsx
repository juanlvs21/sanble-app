import React from 'react';
import {Text} from 'native-base';
import {useRoute} from '@react-navigation/native';

import {SimpleLayout} from '@/layouts/SimpleLayout';
import {TRoute} from '@/types/navigator';

export const StandDetailsScreen: React.FC = () => {
  const {
    params: {id},
  } = useRoute<TRoute<{id: string}>>();

  return (
    <SimpleLayout>
      <Text>Detalles del stand: {id}</Text>
    </SimpleLayout>
  );
};
