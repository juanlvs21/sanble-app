import { Icon, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { TbMapOff } from "react-icons/tb";
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
  center?: LatLngTuple;
  /**
   * List of marks to place on the map
   *
   * @default []
   */
  markers?: TMapMarker[];
  /**
   * Error message
   */
  errorMsg?: string;
  /**
   * Map Loading
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * Custom className for spinner component
   */
  classNameSpinner?: string;
};

export const Map: React.FC<ComponentProps> = ({
  center,
  errorMsg,
  markers = [],
  isLoading = false,
  classNameSpinner = "",
}) => {
  const { userPosition, isGettingPosition, error, getCurrentPosition } =
    useGeolocation();
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <>
      <SpinnerFullScreen
        show={!mapReady || isLoading || isGettingPosition}
        className={`${styles.mapSpinner} ${classNameSpinner}`}
      />

      {error ||
        (errorMsg && (
          <div className={styles.mapError}>
            <TbMapOff size={62} />
            <h4>{error || errorMsg}</h4>
          </div>
        ))}

      {userPosition && !error && !errorMsg && (
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
      )}
    </>
  );
};
