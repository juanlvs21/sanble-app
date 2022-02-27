export enum EProductType {
  CANDY = "candy",
  FOOD = "food",
  CLOTHING = "clothing",
  DRINK = "drink",
  ACCESSORY = "accessory",
}

export type TProductType =
  | EProductType.CANDY
  | EProductType.FOOD
  | EProductType.CLOTHING
  | EProductType.DRINK
  | EProductType.ACCESSORY;

export type TProduct = {
  uuid: string;
  name: string;
  description: string;
  price: number;
  stars: number;
  scorers: number;
  available: boolean;
  url_photo: string;
  type: TProductType;
  uuid_stand?: string;
};
