import { TPhotograph } from "@/types/TPhotograph";

export enum EFairType {
  ENTREPRENEURSHIP = "entrepreneurship",
  GASTRONOMIC = "gastronomic",
}

export type TFair = {
  id: string;
  name: string;
  geopoint: [number, number];
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
