import React from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';
import {View, Heading, Text, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {gray} from '@/constants/Colors';
import {width} from '@/constants/Layout';
import {Skeleton, SkeletonItem} from '@/components/common/Skeleton';
import {getImage} from '@/helpers/getImage';
import {mockStand} from '@/helpers/mockData';
import {TStand} from '@/types/stand';
import {Stars} from '../common/Stars';

export type ComponentProps = {
  /**
   * Stand details
   */
  stand?: TStand;
  /**
   * Card width
   *
   * @default width * 0.7
   */
  cardWidth?: number;
  /**
   * Loading show skeleton card
   */
  loading?: boolean;
};

export const StandCard: React.FC<ComponentProps> = ({
  stand = mockStand,
  loading,
  cardWidth = width * 0.7,
}) => {
  const navigation = useNavigation();

  if (loading) {
    return (
      <Skeleton>
        <SkeletonItem
          width={cardWidth}
          height={110}
          borderRadius={20}
          margin={5}
        />
      </Skeleton>
    );
  }

  return (
    <TouchableHighlight
      style={styles.card}
      onPress={() => navigation.navigate('StandDetails', {id: stand.uuid})}
      underlayColor={gray[600]}
      activeOpacity={0.6}>
      <>
        <View
          style={[
            styles.content,
            {width: cardWidth * 0},
            {width: cardWidth - 120},
          ]}>
          <Heading style={styles.title} numberOfLines={1}>
            {stand.name}
          </Heading>
          <Stars stars={stand.stars} style={styles.stars} />
          <Text color={gray[800]} numberOfLines={2} style={styles.slogan}>
            {stand.slogan}
          </Text>
        </View>
        <Image
          source={getImage(stand.url_photo)}
          alt={stand.name}
          style={styles.image}
        />
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: gray[500],
    borderRadius: 20,
    flexDirection: 'row',
    height: 110,
    margin: 5,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 15,
    fontWeight: '600',
    marginTop: -4,
  },
  slogan: {
    flexWrap: 'wrap',
    fontSize: 13,
  },
  stars: {
    marginTop: -2,
    marginBottom: 3,
  },
});
