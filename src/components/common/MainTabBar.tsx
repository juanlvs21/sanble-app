import React from 'react';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import Entypo from 'react-native-vector-icons/Entypo';

import {gray, secondary} from '@/constants/Colors';
import {width} from '@/constants/Layout';

export const MainTabBar: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => (
  <View style={styles.container}>
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const {tabBarIcon} = options;

        const isFocused = state.index === index;

        const iconColor = isFocused ? 'white' : secondary[500];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableHighlight
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabContainer, isFocused && styles.tabSelected]}
            key={index}
            activeOpacity={0.6}
            underlayColor={gray[600]}>
            <View style={styles.tabContent}>
              {tabBarIcon ? (
                tabBarIcon({
                  color: iconColor,
                  focused: isFocused,
                })
              ) : (
                <Entypo name="circle" size={25} color={iconColor} />
              )}
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
  },
  tabBar: {
    margin: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    elevation: 3,
    shadowColor: secondary[50],
  },
  tabContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
  },
  tabSelected: {
    backgroundColor: secondary[500],
  },
  tabContent: {
    margin: 10,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
