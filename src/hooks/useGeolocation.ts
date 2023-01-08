import { Geolocation } from "@capacitor/geolocation";
import { useState } from "react";

import { TCoords } from "@/types/TGeolocation";

export const useGeolocation = () => {
  const [userPosition, setUserPosition] = useState<TCoords>();
  const [isGettingPosition, setIsGettingPosition] = useState(true);
  const [error, setError] = useState<string>();

  const getCurrentPosition = async () => {
    setIsGettingPosition(true);

    try {
      // TODO: Add a way to turn it on if the GPS is off (Prompt to activate)

      const { location, coarseLocation } = await Geolocation.checkPermissions();

      if (location || coarseLocation) {
        const { coords } = await Geolocation.getCurrentPosition();
        setUserPosition(coords);
      } else {
        setError("Sanble no tiene permisos para obtener tu ubicación");
      }
    } catch (error: any) {
      console.warn(error?.message);
      if (error?.message === "User denied Geolocation") {
        setError("Sanble no tiene permisos para obtener tu ubicación");
      } else if (error?.message === "location unavailable") {
        setError("Tu ubicación es inaccesible");
      } else {
        setError("Ha ocurrido un error al obtener tu ubicación");
      }
    } finally {
      setIsGettingPosition(false);
    }
  };

  return {
    userPosition,
    isGettingPosition,
    error,
    getCurrentPosition,
  };
};
