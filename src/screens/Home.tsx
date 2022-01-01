import React, {useCallback} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Heading} from 'native-base';

import {MainLayout} from '../layouts/MainLayout';
import {Search} from '../components/common/Search';
import {Carousel} from '../components/common/Carousel';
import {FairCard} from '../components/fairs/Card';
import {useHome} from '../hooks/useHome';
import {TFair} from '../types/fairs';
import {TCarouselItem} from '../types/carousel';

export const HomeScreen: React.FC = () => {
  const {handleRefresh, loading, fairs} = useHome();

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => handleRefresh(), []);

  const renderRefreshControl = (
    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
  );

  return (
    <MainLayout renderRefreshControl={renderRefreshControl}>
      <Search style={styles.search} />
      <Heading>Home</Heading>
      <FairCard fair={fairs[0]} />

      <Carousel
        items={fairs}
        renderItem={(data: TCarouselItem<TFair>) => (
          <FairCard fair={data.item} />
        )}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  search: {
    marginBottom: 20,
  },
});
