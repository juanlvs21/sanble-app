import { Geolocation } from "@capacitor/geolocation";
import { useState } from "react";

import { useApp } from "@/hooks/useApp";
import { useToast } from "@/hooks/useToast";
import { TCoords } from "@/types/TGeolocation";

const noGeolocationPermissionsID = "toast_no_geolocation_permissions_id";

export const useGeolocation = () => {
  const { toast, toastDismiss } = useToast();
  const { isMobile } = useApp();
  const [userPosition, setUserPosition] = useState<TCoords>();

  const getCurrentPosition = async () => {
    try {
      toastDismiss(noGeolocationPermissionsID);

      const { location, coarseLocation } = await Geolocation.checkPermissions();
      if (location || coarseLocation) {
        // if (isMobile) {
        //   const request = await Geolocation.requestPermissions();
        //   console.log({ request });
        // }

        const { coords } = await Geolocation.getCurrentPosition();
        setUserPosition(coords);
      } else {
        toast("Sanble no tiene permisos para obtener tu ubicación", {
          type: "error",
          toastId: noGeolocationPermissionsID,
        });
      }
    } catch (error: any) {
      if (error?.message === "User denied Geolocation") {
        toast("Sanble no tiene permisos para obtener tu ubicación", {
          type: "error",
          toastId: noGeolocationPermissionsID,
        });
      } else {
        console.log("------------");
        console.log("hola: ", error);
        console.log(typeof error);
        console.log(JSON.stringify(error));
        console.log("------------");
        toast("Ha ocurrido un error al obtener tu ubicación", {
          type: "error",
          toastId: noGeolocationPermissionsID,
        });
      }
    }
  };

  return {
    userPosition,
    getCurrentPosition,
  };
};
