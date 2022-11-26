import { LatLngExpression, LeafletMouseEventHandlerFn } from "leaflet";

export enum EMapIcon {
  USER_PRIMARY = "pinUserPrimary",
  SHOPPING_BAG_PRIMARY = "pinShoppingBagPrimary",
  SHOPPING_BAG_SECONDARY = "pinShoppingBagSecondary",
  GENERIC_PRIMARY = "pinGenericPrimary",
  GENERIC_SECONDARY = "pinGenericSecondary",
}

export type TMapMarker = {
  id: string | number;
  title: string;
  position: LatLngExpression;
  icon?: EMapIcon;
  additional?: React.ReactElement;
  onClick?: LeafletMouseEventHandlerFn;
};
