import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { useGeolocation } from "@/hooks/useGeolocation";
import styles from "./Map.module.css";

// const fairPin = new Icon({
//   iconUrl: "/assets/icon/shoppingBagPrimary.svg",
//   iconSize: [50, 50],
// });

const userPin = new Icon({
  iconUrl: "/assets/icon/userPinPrimary.svg",
  iconSize: [50, 50],
});

export const Map: React.FC = () => {
  const { userPosition, getCurrentPosition } = useGeolocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return userPosition ? (
    <>
      <SpinnerFullScreen
        show={isLoading}
        className={styles.spinner}
        borderRadius
      />
      <MapContainer
        center={[userPosition.latitude, userPosition.longitude]}
        zoom={15}
        className={styles.mapContainer}
        whenReady={() => setIsLoading(false)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy;<b>Sanble</b>"
        />

        <Marker
          position={[userPosition.latitude, userPosition.longitude]}
          icon={userPin}
        >
          <Tooltip direction="top" offset={[0, -25]} permanent>
            Tu ubicación actual
          </Tooltip>
        </Marker>
      </MapContainer>
    </>
  ) : null;
};
