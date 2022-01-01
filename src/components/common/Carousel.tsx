import React from 'react';
import {Animated, View, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Spinner} from 'native-base';

import {width} from '../../constants/Layout';

type ComponentProps = {
  /**
   * items carousel
   */
  items: any[];
  /**
   * Key extractor function list
   */
  keyExtractor: (item: any, index?: number) => string;
  /**
   * Render item component carousel
   */
  renderItem: (data?: any) => React.ReactElement;
  /**
   * Loading (show array skeleton carusel)
   *
   * @default false
   */
  loading?: boolean;
  /**
   * Skeleton element loading (If loading=true)
   *
   * @default <Spinner size="lg" />
   */
  SkeletonElement?: React.ReactElement;
  /**
   * Container Width
   *
   * @default width * 0.7
   */
  containerWidth?: number;
  /**
   * Container Width
   *
   * @default  (width - width * 0.7) / 3
   */
  containerSpace?: number;
  /**
   * Styles flat list
   */
  containerStyle?: StyleProp<ViewStyle>;
};

export const Carousel: React.FC<ComponentProps> = ({
  items,
  keyExtractor,
  renderItem,
  containerWidth = width * 0.7,
  containerSpace = (width - width * 0.7) / 3,
  containerStyle,
  loading,
  SkeletonElement = <Spinner size="lg" />,
}) => {
  // const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={containerStyle}>{SkeletonElement}</View>
      ) : (
        <Animated.FlatList
          data={items}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={containerWidth}
          scrollEventThrottle={16}
          contentContainerStyle={[
            containerStyle,
            {marginHorizontal: containerSpace},
          ]}
          keyExtractor={keyExtractor}
          renderItem={({item, index}) => {
            // const inputRange = [
            //   (index - 1) * containerWidth,
            //   index * containerWidth,
            //   (index + 1) * containerWidth,
            // ];

            // const outputRange = [0, -30, 0];

            // const scrollY = scrollX.interpolate({
            //   inputRange,
            //   outputRange,
            // });

            const marginRight =
              index === items.length - 1 ? containerWidth * 0.2 : 0;

            return (
              <Animated.View
                style={{
                  width: containerWidth,
                  marginRight,
                  // transform: [{translateY: scrollY}],
                }}>
                {renderItem(item)}
                {/* {index === items.length - 1 ? (
        <View style={{width: containerWidth}} />
      ) : null} */}
              </Animated.View>
            );
          }}
          // onScroll={Animated.event(
          //   [{nativeEvent: {contentOffset: {x: scrollX}}}],
          //   {useNativeDriver: true},
          // )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
