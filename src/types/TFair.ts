import { DocumentReference } from "firebase/firestore";
import { LatLngTuple } from "leaflet";

import { TPhotograph } from "@/types/TPhotograph";
import { TUserOwnerData } from "./TUser";

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
  celebrationDate?: string;
  ownerRef: DocumentReference;
  owner: TUserOwnerData;
  address: string;
  description: string;
  stars: number;
  type: EFairType;
  contactEmail: string;
  contactPhone: string;
  photographs: TPhotograph[];
  coverUrl?: string;
  stands: DocumentReference[];
};

export type TFairGeo = {
  id: string;
  name: string;
  geopoint?: LatLngTuple;
  stars: number;
  type: EFairType; // TODO: We can distinguish the marker icon depending on the type of fair
};

export type TFairForm = {
  id?: string;
  name: string;
  geopoint?: LatLngTuple;
  celebrationDate?: string;
  address: string;
  description: string;
  stars?: number;
  type?: EFairType;
  contactEmail?: string;
  contactPhone: string;
};
