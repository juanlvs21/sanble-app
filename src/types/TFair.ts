import { TPhotograph } from "@/types/TPhotograph";
import { TFireBaseDocRefBasic } from "@/types/TFirebase";
import { LatLngTuple } from "leaflet";

export enum EFairType {
  ENTREPRENEURSHIP = "entrepreneurship",
  GASTRONOMIC = "gastronomic",
}

export enum EFairOrderBy {
  BEST = "best",
  WORST = "worst",
  CELEBRATIONDATE = "celebrationDate",
}

export type TFair = {
  id: string;
  name: string;
  geopoint?: LatLngTuple;
  creationTime: string;
  celebrationDate: string;
  owner: TFireBaseDocRefBasic;
  address: string;
  description: string;
  stars: number;
  type: EFairType;
  contactEmail: string;
  contactPhone: string;
  photographs: TPhotograph[];
  coverUrl?: string;
};

export type TFairGeo = {
  id: string;
  name: string;
  geopoint?: LatLngTuple;
  stars: number;
  type: EFairType; // TODO: We can distinguish the marker icon depending on the type of fair
};
