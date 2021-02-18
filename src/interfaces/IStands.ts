export default interface IStands {
  uuid: string;
  name: string;
  description: string;
  slogan: string;
  stars: number;
  url_photo: any;
  items: Array<IItem>;
  promotions: Array<IPromotion>;
}

export interface IItem {
  uuid: string;
  name: string;
  description: string;
  price: number;
  stars: number;
  scorers: number;
  url_photo: string;
}

export interface IPromotion {
  uuid: string;
  title: string;
  description: string;
  is_active: boolean;
  url_photo: string;
  items: Array<string>;
}
