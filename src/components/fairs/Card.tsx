import React from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';
import {View, Heading, Text, Image, Badge} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {gray} from '@/constants/Colors';
import {width} from '@/constants/Layout';
import {Skeleton, SkeletonItem} from '@/components/common/Skeleton';
import {getFairCover} from '@/helpers/getFairCover';
import {dateFormat} from '@/helpers/dateFormat';
import {mockFair} from '@/helpers/mockData';
import {TFair} from '@/types/fair';

type ComponentProps = {
  /**
   * Fair details
   */
  fair?: TFair;
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

export const FairCard: React.FC<ComponentProps> = ({
  fair = mockFair,
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
      onPress={() => navigation.navigate('FairDetails', {id: fair.uuid})}
      activeOpacity={0.6}
      underlayColor={gray[600]}>
      <>
        <Image
          source={getFairCover(fair.photographs)}
          alt={fair.name}
          style={styles.image}
        />
        <View style={[styles.content, {width: cardWidth - 50}]}>
          <Heading style={styles.title} numberOfLines={1}>
            {fair.name}
          </Heading>
          <Text color={gray[800]} numberOfLines={2} style={styles.description}>
            {fair.description}
          </Text>
          <View style={styles.badgeContainer}>
            <Badge>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={15}
                color="#FFF"
                style={styles.badgeIcon}
              />
              {' ' + dateFormat(fair.date_time, 'DD MMM HH:mm a')}
            </Badge>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: gray[500],
    height: 110,
    borderRadius: 20,
    flexDirection: 'row',
    padding: 8,
    margin: 5,
  },
  content: {
    paddingHorizontal: 15,
    paddingRight: 80,
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 15,
    fontWeight: '600',
    marginTop: -4,
  },
  description: {
    flexWrap: 'wrap',
    fontSize: 13,
    marginTop: -2,
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 15,
  },
  badgeContainer: {
    marginTop: 4,
    flexDirection: 'row',
  },
  badgeIcon: {
    marginTop: -4,
  },
});
