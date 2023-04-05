import { LatLngTuple, LatLngExpression } from "leaflet";
import { useRef, useState, useMemo } from "react";
import { Marker } from "react-leaflet";

import { MapPin } from "@/components/modules/geolocation/MapIcons";
import { EMapIcon } from "@/types/TMap";

export type ComponentProps = {
  /**
   * Position Marker
   */
  position: LatLngExpression;
  /**
   * Icon Marker
   */
  icon?: EMapIcon;
  /**
   * Tooltip component
   */
  Tooltip?: React.ReactNode;
  /**
   *  Marker drag event
   */
  draggableMarkerEvent?: (latlng: LatLngTuple) => void;
};

export const MapMarker = ({
  position,
  icon,
  Tooltip,
  draggableMarkerEvent,
}: ComponentProps) => {
  const markerRef = useRef(null);
  const [location, setLocation] = useState<LatLngExpression>(position);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null && draggableMarkerEvent) {
          const latlng = marker.getLatLng();
          setLocation(latlng);
          draggableMarkerEvent([latlng.lat, latlng.lng]);
        }
      },
    }),
    []
  );

  return (
    <Marker
      ref={markerRef}
      draggable={Boolean(eventHandlers)}
      eventHandlers={eventHandlers}
      position={location}
      icon={MapPin(icon)}
    >
      {Tooltip}
    </Marker>
  );
};
