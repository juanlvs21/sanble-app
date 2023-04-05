import { Icon } from "leaflet";

import { EMapIcon } from "@/types/TMap";

export const MapPin = (icon = EMapIcon.GENERIC_SECONDARY) =>
  new Icon({
    iconUrl: `/assets/icon/${icon}.svg`,
    iconSize: [50, 50],
  });
