import { TFireBaseDocRefBasic } from "@/types/TFirebase";
import { TPhotograph } from "@/types/TPhotograph";

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
  photographs: TPhotograph[];
  creationTime: string;
  fairs: TFireBaseDocRefBasic[];
  owner: TFireBaseDocRefBasic;
  slogan?: string;
};
