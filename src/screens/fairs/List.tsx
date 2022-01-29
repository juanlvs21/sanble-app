import React, {useCallback} from 'react';
import {RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';

import {MainLayout} from '@/layouts/MainLayout';
import {Search} from '@/components/common/Search';
import {FairCardList} from '@/components/fairs/CardList';
import {useFairs} from '@/hooks/useFairs';

export const FairsListScreen: React.FC = () => {
  const {fairsList, loading, getListFairs} = useFairs();

  useFocusEffect(
    useCallback(() => {
      console.log({fairsList: fairsList.length});
      if (!fairsList.length) {
        getListFairs();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fairsList]),
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => getListFairs(), []);

  const renderRefreshControl = (
    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
  );

  return (
    <MainLayout renderRefreshControl={renderRefreshControl}>
      <Search placeholder="Encuentra la feria que buscas" />

      {loading && !fairsList.length
        ? [1, 2, 3].map(n => <FairCardList key={n} loading />)
        : fairsList.map(fair => <FairCardList key={fair.uuid} fair={fair} />)}
    </MainLayout>
  );
};
