import { TProduct } from "@/types/TProduct";
import { TPromotion } from "@/types/TPromotions";

export type TStand = {
  uuid: string;
  name: string;
  description: string;
  stars: number;
  url_photo?: string;
  products: TProduct[];
  promotions: TPromotion[];
  uuid_user: string;
  slogan?: string;
  creationTime?: string;
};
