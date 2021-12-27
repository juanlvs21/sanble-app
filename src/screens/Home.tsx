import React from 'react';
import {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Heading, Text} from 'native-base';

import {MainLayout} from '../layouts/MainLayout';
import {Search} from '../components/common/Search';
import {useFairs} from '../hooks/useFairs';

export const HomeScreen: React.FC = () => {
  const {handleGetRecentFairs, fairs} = useFairs();

  useFocusEffect(
    useCallback(() => {
      handleGetRecentFairs();
    }, []),
  );

  return (
    <MainLayout>
      <Search style={styles.search} />
      <Heading>Home</Heading>
      {fairs.map(fair => (
        <Text key={fair.uuid}>{fair.name}</Text>
      ))}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  search: {
    marginBottom: 20,
  },
});
