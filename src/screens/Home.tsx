import React, {useCallback} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Heading} from 'native-base';

import {MainLayout} from '../layouts/MainLayout';
import {Search} from '../components/common/Search';
import {Carousel} from '../components/common/Carousel';
import {FairCard} from '../components/fairs/Card';
import {PromotionCardType} from '../components/products/CardType';
import {productTypes} from '../helpers/productTypes';
import {useHome} from '../hooks/useHome';
import {TFair} from '../types/fair';
import {TProductType} from '../types/product';

export const HomeScreen: React.FC = () => {
  const {handleRefresh, loading, fairs, fairsLoading} = useHome();

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
      <Heading>Próximas Ferias</Heading>
      <Carousel
        items={fairs}
        keyExtractor={(fair: TFair) => fair.uuid}
        renderItem={(fair: TFair) => <FairCard fair={fair} />}
        containerStyle={styles.carousel}
        SkeletonElement={<FairCard loading />}
        loading={fairsLoading}
      />
      <Heading>Productos</Heading>
      <Carousel
        items={productTypes}
        keyExtractor={(type: TProductType) => type}
        renderItem={(type: TProductType) => <PromotionCardType type={type} />}
        containerStyle={styles.carousel}
        containerWidth={180}
        containerSpace={(180 - 180 * 0.7) / 4}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  search: {
    marginBottom: 20,
  },
  carousel: {
    marginVertical: 10,
  },
});
