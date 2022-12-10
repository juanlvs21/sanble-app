import { TFairGeo } from "@/types/TFair";
import { EMapIcon, TMapMarker } from "@/types/TMap";

export const formatFairsMarks = (
  fairs: TFairGeo[],
  onClick?: (id: string, text?: string) => void
): TMapMarker[] => {
  const markers: TMapMarker[] = [];

  fairs.forEach((fair: TFairGeo) => {
    if (fair.geopoint) {
      markers.push({
        id: fair.id,
        title: fair.name,
        position: fair.geopoint,
        icon: EMapIcon.SHOPPING_BAG_PRIMARY,
        onClick: onClick ? () => onClick(fair.id, fair.name) : undefined,
        // additional: undefined,
      });
    }
  });

  return markers;
};
