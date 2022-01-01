import React from 'react';
import {View, Text} from 'native-base';
import {useRoute} from '@react-navigation/native';

import {TRoute} from '../../types/navigator';

export const FairDetailsScreen: React.FC = () => {
  const {
    params: {id},
  } = useRoute<TRoute<{id: string}>>();

  return (
    <View>
      <Text>Detalles de la feria: {id}</Text>
    </View>
  );
};
