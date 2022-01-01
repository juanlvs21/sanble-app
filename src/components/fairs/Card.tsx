import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Heading, Text, Image} from 'native-base';

import {gray} from '../../constants/Colors';
import {getFairCover} from '../../helpers/getFairCover';
import {TFair} from '../../types/fairs';

type ComponentProps = {
  /**
   * Fair details
   */
  fair: TFair;
};

export const FairCard: React.FC<ComponentProps> = ({fair}) => {
  return (
    <View style={styles.card}>
      <Image
        source={getFairCover(fair.photographs)}
        width={95}
        height={95}
        borderRadius={15}
        alt={fair.name}
      />
      <View style={styles.content}>
        <Heading fontSize={18} fontWeight={600}>
          {fair.name}
        </Heading>
        <Text color={gray[800]} numberOfLines={2} style={styles.description}>
          {fair.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: gray[500],
    height: 110,
    borderRadius: 20,
    flexDirection: 'row',
    padding: 8,
  },
  content: {
    paddingHorizontal: 15,
    paddingRight: 80,
  },
  description: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
