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
  slogan: string;
  stars: number;
  url_photo: any;
  products: TProduct[];
  promotions: TStandPromotion[];
  uuid_user: string;
  creationTime: string;
};
