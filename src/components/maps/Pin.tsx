import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {primary, secondary, gray} from '@/constants/Colors';

const color = {
  primary: primary[500],
  secondary: secondary[500],
  gray: gray[500],
};

type ComponentProps = {
  /**
   * Coordinate pin
   */
  coordinate: GeoJSON.Position;
  /**
   * Pin id
   */
  id: string;
  /**
   * On press pin
   */
  onSelected?: () => void;
  /**
   * Title pin map
   */
  title?: string;
  /**
   * Pin icon type
   *
   * @defaut "pin"
   */
  pinIcon?: 'pin' | 'fair';
  /**
   * Pin map color
   *
   * @default "primary"
   */
  pinColor?: 'primary' | 'secondary' | 'gray';
  /**
   * Pin map size
   *
   * @default 60
   */
  pinSize?: number;
};

export const MapPin: React.FC<ComponentProps> = ({
  id,
  coordinate,
  onSelected,
  title,
  pinIcon = 'pin',
  pinColor = 'primary',
  pinSize = 60,
}) => (
  <MapboxGL.PointAnnotation
    id={id}
    title={title}
    coordinate={coordinate}
    onSelected={onSelected}>
    <View style={styles.container}>
      {/* {title ? (
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      ) : null} */}

      {pinIcon === 'fair' ? (
        <MaterialCommunityIcons
          name="storefront-outline"
          size={pinSize}
          color={color[pinColor]}
        />
      ) : (
        <Entypo name="location-pin" size={pinSize} color={color[pinColor]} />
      )}
    </View>
  </MapboxGL.PointAnnotation>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: 80,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    flexWrap: 'wrap',
    color: secondary[500],
  },
});
