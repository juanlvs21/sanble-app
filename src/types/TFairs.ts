import { TPagination } from "@/types/THttp";
import { TPhotograph } from "@/types/TPhotograph";

export enum EFairType {
  ENTREPRENEURSHIP = "entrepreneurship",
  GASTRONOMIC = "gastronomic",
}

export type TFair = {
  id: string;
  name: string;
  geopoint: [number, number] | null;
  creationTime: string;
  celebrationDate: string;
  owner: string;
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

export type FairsListResponse = {
  fairs: TFair[];
  pagination: TPagination;
};
