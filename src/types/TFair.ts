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

export enum EFairCelebrationType {
  "WEEKLY" = "WEEKLY",
  "MONTHLY" = "MONTHLY",
  "SPECIFIC_DATE" = "SPECIFIC_DATE",
  "NOT_SPECIFIED" = "NOT_SPECIFIED",
}

export type TFair = {
  id: string;
  name: string;
  geopoint?: LatLngTuple;
  creationTime: string;
  celebrationType?: EFairCelebrationType;
  celebrationWeeklyDay?: number;
  celebrationMonthlyDay?: number;
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
  address: string;
  description: string;
  stars?: number;
  type?: EFairType;
  contactEmail?: string;
  contactPhone: string;
  celebrationType?: EFairCelebrationType;
  celebrationWeeklyDay?: number;
  celebrationMonthlyDay?: number;
  celebrationDate?: string;
};
