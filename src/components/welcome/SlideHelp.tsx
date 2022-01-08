import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import {secondary} from '@/constants/Colors';

export type ComponentProps = {
  /**
   * Text show in the help
   */
  text: string;
};

export const WelcomeSlideHelp: React.FC<ComponentProps> = ({text}) => {
  return (
    <View style={styles.helpContainer}>
      <Text style={styles.helpText}>{text}</Text>
      <View style={styles.helpIconsContainer}>
        <Entypo
          name="chevron-small-right"
          size={20}
          style={styles.helpIconArrowSmall}
        />
        <Entypo name="chevron-thin-right" size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#FFF',
  },
  helpContainer: {
    flexDirection: 'row',
  },
  helpText: {
    fontSize: 18,
  },
  helpIconsContainer: {
    flexDirection: 'row',
  },
  helpIconArrowSmall: {
    marginRight: -15,
    marginLeft: 5,
    color: secondary[100],
  },
  btn: {
    width: '100%',
    marginTop: 10,
  },
});
