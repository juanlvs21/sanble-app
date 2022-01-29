import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Heading, Image, Text, View} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {gray, secondary} from '@/constants/Colors';
import {Skeleton} from '@/components/common/Skeleton';
import {Stars} from '@/components/common/Stars';
import {getFairCover} from '@/helpers/getFairCover';
import {dateFormat} from '@/helpers/dateFormat';
import {mockFair} from '@/helpers/mockData';
import {TFair} from '@/types/fair';
import {BtnFavorite} from '../common/BtnFavorite';

export type ComponentProps = {
  /**
   * Fair details
   */
  fair?: TFair;
  /**
   * Loading show skeleton card
   */
  loading?: boolean;
};

export const FairCardList: React.FC<ComponentProps> = ({
  fair = mockFair,
  loading,
}) => {
  const [cardWidth, setCardWidth] = useState<number>(0);

  if (loading) {
    return (
      <Skeleton width="100%" height={140} marginBottom={15} borderRadius={20} />
    );
  }

  return (
    <View
      style={styles.card}
      onLayout={event => {
        const {width} = event.nativeEvent.layout;
        setCardWidth(width);
      }}>
      <Image
        source={getFairCover(fair.photographs)}
        alt={fair.name}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={[styles.col1, {width: cardWidth - 190}]}>
          <View>
            <Heading style={styles.name}>{fair.name}</Heading>
            <Text>{fair.typeFriendly}</Text>
          </View>

          <Stars stars={fair.stars} />
        </View>
        <View style={styles.col2}>
          <View style={styles.date}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={15}
              color={secondary[900]}
            />
            <Text> {dateFormat(fair.date_time, 'DD MMM')}</Text>
          </View>
          <BtnFavorite isFavorite={true} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: gray[500],
    borderRadius: 20,
    marginBottom: 15,
    height: 140,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 140,
    borderRadius: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col1: {
    marginRight: 20,
    justifyContent: 'space-between',
  },
  col2: {
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 5,
  },
  date: {
    flexDirection: 'row',
  },
});
