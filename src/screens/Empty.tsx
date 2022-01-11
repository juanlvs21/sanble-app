import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import {useRoute} from '@react-navigation/native';

import {Drawer} from '@/components/common/Drawer';

export const Empty: React.FC = () => {
  const {name} = useRoute();

  return (
    <Drawer>
      <View style={styles.container}>
        <Text>{name}</Text>
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
