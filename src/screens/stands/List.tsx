import React, {useCallback} from 'react';
import {RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';

import {MainLayout} from '@/layouts/MainLayout';
import {StandCardList} from '@/components/stands/CardList';
import {useStands} from '@/hooks/useStands';
import {Search} from '@/components/common/Search';

export const StandsListScreen: React.FC = () => {
  const {standsList, loading, getListStands} = useStands();

  useFocusEffect(
    useCallback(() => {
      console.log({standsList: standsList.length});
      if (!standsList.length) {
        getListStands();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [standsList]),
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(() => getListStands(), []);

  const renderRefreshControl = (
    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
  );

  return (
    <MainLayout renderRefreshControl={renderRefreshControl}>
      <Search placeholder="Encuentra el Stand que buscas" />

      {loading && !standsList.length
        ? [1, 2, 3].map(n => <StandCardList key={n} loading />)
        : standsList.map(stand => (
            <StandCardList key={stand.uuid} stand={stand} />
          ))}
    </MainLayout>
  );
};
