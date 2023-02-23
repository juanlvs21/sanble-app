import { TFireBaseDocRefBasic } from "@/types/TFirebase";

export enum EStandOrderBy {
  BEST = "best",
  WORST = "worst",
}

export type TStand = {
  id: string;
  name: string;
  stars: number;
  description: string;
  contactEmail: string;
  contactPhone: string;
  coverUrl?: string;
  creationTime: string;
  fairs: TFireBaseDocRefBasic[];
  owner: TFireBaseDocRefBasic;
  products: any[];
  promotions: any[];
  slogan?: string;
};

export type TStandRouteState = {
  standID: string;
  standName: string;
  goBackUrl: string;
};
