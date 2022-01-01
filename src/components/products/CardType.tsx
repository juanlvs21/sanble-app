import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {gray} from '../../constants/Colors';
import {TProductType} from '../../types/product';

const icon = {
  drink: require('../../assets/images/products/drink.png'),
  clothing: require('../../assets/images/products/clothing.png'),
  candy: require('../../assets/images/products/candy.png'),
  food: require('../../assets/images/products/candy.png'),
  accessory: require('../../assets/images/products/candy.png'),
};
const text = {
  drink: 'Bebidas',
  clothing: 'Ropa',
  candy: 'Dulces',
  food: 'Comida',
  accessory: 'Accesorios',
};

type ComponentProps = {
  /**
   * Type product card
   */
  type: TProductType;
};

export const PromotionCardType: React.FC<ComponentProps> = ({type}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PromotionList', {type})}>
      <Image source={icon[type]} alt={text[type]} style={styles.icon} />
      <Text style={styles.text} fontWeight="semibold">
        {text[type]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: gray[500],
    width: 150,
    height: 110,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 41,
    height: 41,
  },
  text: {
    marginTop: 5,
  },
});
