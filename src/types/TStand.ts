import { DocumentReference } from "firebase/firestore";

import { TPhotograph } from "@/types/TPhotograph";
import { TUserOwnerData } from "./TUser";

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
  fairs: DocumentReference[];
  ownerRef: DocumentReference;
  owner: TUserOwnerData;
  slogan?: string;
};

export type TStandForm = {
  id?: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  slogan: string;
};
