import { TFireBaseDocRefBasic } from "@/types/TFirebase";

export enum EReviewType {
  STAND = "stand",
  FAIR = "fair",
}

export type TReview = {
  id: string;
  comment: string;
  stars: number;
  type: EReviewType;
  ownerName: string;
  ownerPhoto?: string;
  creationTime: string;
  owner: TFireBaseDocRefBasic;
  parent: TFireBaseDocRefBasic;
};

export type TReviewForm = Pick<TReview, "comment" | "stars">;
