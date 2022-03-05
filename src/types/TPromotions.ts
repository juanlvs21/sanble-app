import { TProduct } from "@/types/TProduct";

export type TPromotion = {
  uuid: string;
  title: string;
  description: string;
  is_active?: boolean;
  url_photo: string;
  items?: TProduct[];
  stand_uuid: string;
  stand_name: string;
};
