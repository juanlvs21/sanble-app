import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import {useRoute} from '@react-navigation/native';

import {MainLayout} from '@/layouts/MainLayout';

export const Empty: React.FC = () => {
  const {name} = useRoute();

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text>{name}</Text>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
