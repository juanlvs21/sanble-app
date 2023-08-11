import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { TbMapOff } from "react-icons/tb";
import { MapContainer, TileLayer, Tooltip /* Popup */ } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { MapMarker } from "@/components/modules/geolocation/MapMarker";
import { useGeolocation } from "@/hooks/useGeolocation";
import { EMapIcon, TMapMarker } from "@/types/TMap";
import styles from "./Map.module.css";

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
   * Main marker drag event
   */
  draggableMarkerEvent?: (latlng: LatLngTuple) => void;
  /**
   * Main marker drag tooltip text
   */
  DraggableMarkerTooltip?: React.ReactNode;
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

export const Map = ({
  center,
  errorMsg,
  markers = [],
  isLoading = false,
  classNameSpinner = "",
  DraggableMarkerTooltip,
  draggableMarkerEvent,
}: ComponentProps) => {
  const { userPosition, isGettingPosition, error, getCurrentPosition } =
    useGeolocation();
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <>
      <SpinnerFullScreen
        show={
          (!mapReady || isLoading || isGettingPosition) && !(error || errorMsg)
        }
        className={`${styles.mapSpinner} ${classNameSpinner}`}
      />

      {(error || errorMsg) && (
        <div className={styles.mapError}>
          <TbMapOff size={62} />
          <h4>{error || errorMsg}</h4>
        </div>
      )}

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

          {draggableMarkerEvent ? (
            <MapMarker
              position={
                center || [userPosition.latitude, userPosition.longitude]
              }
              icon={EMapIcon.GENERIC_PRIMARY}
              draggableMarkerEvent={draggableMarkerEvent}
              Tooltip={DraggableMarkerTooltip}
            />
          ) : (
            <MapMarker
              position={[userPosition.latitude, userPosition.longitude]}
              icon={EMapIcon.USER_PRIMARY}
              Tooltip={
                <Tooltip direction="bottom" offset={[0, 30]} permanent>
                  <b>Tu ubicación actual</b>
                </Tooltip>
              }
            />
          )}

          {markers.map((marker: TMapMarker) => (
            <MapMarker
              key={marker.id}
              position={marker.position}
              icon={marker.icon}
              Tooltip={
                <Tooltip
                  direction="bottom"
                  offset={[0, 30]}
                  eventHandlers={{
                    click: marker.onClick || undefined,
                  }}
                  interactive
                  permanent
                >
                  <b>{marker.title}</b>
                  {marker.onClick && <small>Ver detalles</small>}
                </Tooltip>
              }
            />
          ))}
        </MapContainer>
      )}
    </>
  );
};
