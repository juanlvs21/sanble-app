import { TProduct } from "@/types/TProduct";
import { TPromotion } from "@/types/TPromotions";

export type TStand = {
  id: string;
  name: string;
  description: string;
  stars: number;
  photoUrl?: string;
  products?: TProduct[];
  promotions?: TPromotion[];
  slogan?: string;
  userId: string;
  createdAt: string;
};
