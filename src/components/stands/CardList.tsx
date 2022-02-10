import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Heading, Image, Text, View} from 'native-base';

import {gray} from '@/constants/Colors';
import {Skeleton} from '@/components/common/Skeleton';
import {Stars} from '@/components/common/Stars';
import {BtnFavorite} from '@/components/common/BtnFavorite';
import {getImage} from '@/helpers/getImage';
import {mockStand} from '@/helpers/mockData';
import {TStand} from '@/types/stand';

export type ComponentProps = {
  /**
   * Stand details
   */
  stand?: TStand;
  /**
   * Loading show skeleton card
   */
  loading?: boolean;
};

export const StandCardList: React.FC<ComponentProps> = ({
  stand = mockStand,
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
      <View style={[styles.content, {width: cardWidth - 120}]}>
        <Heading style={styles.name}>{stand.name}</Heading>
        <Stars stars={stand.stars} style={styles.stars} />
        <Text numberOfLines={2}>{stand.slogan}</Text>
      </View>
      <Image
        source={getImage(stand.url_photo)}
        alt={stand.name}
        style={styles.image}
      />
      <View style={styles.favoriteContainer}>
        <BtnFavorite isFavorite={true} />
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
    width: 120,
    height: 140,
    borderRadius: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  stars: {
    marginTop: 2,
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 5,
  },
  favoriteContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
