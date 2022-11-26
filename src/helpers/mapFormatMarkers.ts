import { TFairGeo } from "@/types/TFairs";
import { EMapIcon, TMapMarker } from "@/types/TMap";

export const formatFairsMarks = (
  fairs: TFairGeo[],
  onClick?: (id: string) => void
): TMapMarker[] => {
  const markers: TMapMarker[] = [];

  fairs.forEach((fair: TFairGeo) => {
    if (fair.geopoint) {
      markers.push({
        id: fair.id,
        title: fair.name,
        position: fair.geopoint,
        icon: EMapIcon.SHOPPING_BAG_PRIMARY,
        onClick: onClick ? () => onClick(fair.id) : undefined,
        // additional: undefined,
      });
    }
  });

  return markers;
};
