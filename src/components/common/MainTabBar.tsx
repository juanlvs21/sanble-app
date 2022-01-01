import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';

import {secondary} from '@/constants/Colors';
import {width} from '@/constants/Layout';

export const MainTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
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
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabContainer, isFocused && styles.tabSelected]}
              key={index}>
              <View style={styles.tabContent}>
                {tabBarIcon ? (
                  tabBarIcon({
                    size: 25,
                    color: iconColor,
                    focused: isFocused,
                  })
                ) : (
                  <Entypo name="circle" size={25} color={iconColor} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

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
