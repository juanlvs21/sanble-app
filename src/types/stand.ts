import {TProduct} from '@/types/product';

export type TStandPromotion = {
  uuid: string;
  title: string;
  description: string;
  is_active: boolean;
  url_photo: string;
  items: string[];
};

export type TStand = {
  uuid: string;
  name: string;
  description: string;
  stars: number;
  url_photo?: string;
  products: TProduct[];
  promotions: TStandPromotion[];
  uuid_user: string;
  slogan?: string;
  creationTime?: string;
};
