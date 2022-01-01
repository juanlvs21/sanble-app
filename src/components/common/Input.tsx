import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IInputProps, Input} from 'native-base';

import {gray} from '@/constants/Colors';

export const InputField: React.FC<IInputProps> = props => {
  return (
    <View style={styles.container}>
      <Input {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: gray[500],
    borderRadius: 22,
  },
});
