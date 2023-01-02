import { Icon, LatLngLiteral } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip /* Popup */,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { useGeolocation } from "@/hooks/useGeolocation";
import { EMapIcon, TMapMarker } from "@/types/TMap";
import styles from "./Map.module.css";

const userPin = new Icon({
  iconUrl: `/assets/icon/${EMapIcon.USER_PRIMARY}.svg`,
  iconSize: [50, 50],
});

export type ComponentProps = {
  /**
   * Center map
   */
  center?: [number, number] | null;
  /**
   * List of marks to place on the map
   *
   * @default []
   */
  markers?: TMapMarker[];
  /**
   * Map Loading
   *
   * @default false
   */
  isLoading?: boolean;
};

export const Map: React.FC<ComponentProps> = ({
  center,
  markers = [],
  isLoading = false,
}) => {
  const { userPosition, getCurrentPosition } = useGeolocation();
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return userPosition ? (
    <>
      <SpinnerFullScreen
        show={!mapReady || isLoading}
        className={styles.mapSpinner}
      />
      <MapContainer
        center={center || [userPosition.latitude, userPosition.longitude]}
        zoom={15}
        className={styles.mapContainer}
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy;<b>Sanble</b>"
        />

        <Marker
          position={[userPosition.latitude, userPosition.longitude]}
          icon={userPin}
        >
          {/* <Popup>
            <div className={styles.mapTooltipContent}>
              <span>Tu ubicación actual</span>
            </div>
          </Popup> */}
          <Tooltip direction="bottom" offset={[0, 30]} permanent>
            <div className={styles.mapTooltipContent}>
              <b>Tu ubicación actual</b>
            </div>
          </Tooltip>
        </Marker>

        {markers.map((marker: TMapMarker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={
              new Icon({
                iconUrl: `/assets/icon/${
                  marker.icon || EMapIcon.GENERIC_SECONDARY
                }.svg`,
                iconSize: [50, 50],
              })
            }
          >
            {/* <Popup>
              <div
                className={styles.mapTooltipContent}
                onClick={() => alert("TEST")}
              >
                <span>{marker.title}</span>
                {marker.additional}
              </div>
            </Popup> */}
            <Tooltip
              direction="bottom"
              offset={[0, 30]}
              eventHandlers={{
                click: marker.onClick || undefined,
              }}
              interactive
              permanent
            >
              <div className={styles.mapTooltipContent}>
                <b>{marker.title}</b>
                {marker.onClick && <small>Ver detalles</small>}
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </>
  ) : null;
};
