import { DocumentReference } from "firebase/firestore";
import { TUserOwnerData } from "./TUser";

export type TReview = {
  id: string;
  comment: string;
  stars: number;
  creationTime: string;
  ownerRef: DocumentReference;
  owner: TUserOwnerData;
  parent: DocumentReference;
};

export type TReviewForm = Pick<TReview, "comment" | "stars">;
