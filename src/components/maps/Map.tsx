import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Heading, Text} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MAPBOX_ACCESS_TOKEN} from '@env';

import {width, height} from '@/constants/Layout';
import {MapPin} from '@/components/maps/Pin';
import {useMaps} from '@/hooks/useMaps';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

export type ComponentProps = {
  /**
   * If true, the map will have the user's GPS coordinates (If true, centerCoordinate will be ignored)
   *
   * @default false
   */
  withUserCurrentPosition?: boolean;
  /**
   * Coordinates to center the camera on the map (withUserCurrentPosition must be false)
   *
   * @default [0,0]
   */
  centerCoordinate?: GeoJSON.Position;
  /**
   * Zoom for the camera on the map
   */
  zoomLevel?: number;
};

export const Map: React.FC<ComponentProps> = ({
  withUserCurrentPosition = false,
  centerCoordinate = [0, 0],
  zoomLevel = 13,
}) => {
  const {currentCoordinate, locationAvailable} = useMaps();

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {locationAvailable ? (
          <MapboxGL.MapView
            style={styles.map}
            logoEnabled={false}
            attributionEnabled={false}>
            <MapboxGL.Camera
              zoomLevel={zoomLevel}
              centerCoordinate={
                withUserCurrentPosition ? currentCoordinate : centerCoordinate
              }
            />
            <MapPin
              id="user-coordinate"
              title="Tu"
              coordinate={
                withUserCurrentPosition ? currentCoordinate : centerCoordinate
              }
            />
          </MapboxGL.MapView>
        ) : (
          <View style={styles.gpsOffContainer}>
            <MaterialIcons name="gps-off" size={60} />
            <Heading style={styles.gpsOffTitle}>GPS Desactivado</Heading>
            <Text style={styles.gpsOffSubtitle}>
              El uso de las funciones de mapas requieres el GPS activado
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width,
    height: height - 50,
  },
  map: {
    flex: 1,
  },
  gpsOffContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  gpsOffTitle: {
    marginTop: 30,
    fontWeight: '700',
  },
  gpsOffSubtitle: {
    marginTop: 10,
    textAlign: 'center',
    width: 300,
    fontSize: 16,
  },
});
