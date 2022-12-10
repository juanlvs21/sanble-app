export enum EProductTypeKey {
  CLOTHES = "clothes",
  ACCESSORIES = "accessories",
  DRINKS = "drinks",
  CANDIES = "candies",
  FOODS = "foods",
}

export type TProductType = {
  id: string;
  key: EProductTypeKey;
  name: string;
};
