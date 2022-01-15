import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import {useRoute} from '@react-navigation/native';

import {Navbar} from '@/components/common/Navbar';

export const Empty: React.FC = () => {
  const {name} = useRoute();

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <Text>{name}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
