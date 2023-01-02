import { TPhotograph } from "@/types/TPhotograph";
import { TFireBaseDocRefBasic } from "@/types/TFirebase";

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
  geopoint: [number, number] | null;
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
  geopoint: [number, number] | null;
  stars: number;
  type: EFairType; // TODO: We can distinguish the marker icon depending on the type of fair
};