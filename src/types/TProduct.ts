import { DocumentReference } from "firebase/firestore";

export enum EProductCurrency {
  BS = "Bs.",
  USD = "$",
}

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

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  type: EProductTypeKey;
  currency: EProductCurrency;
  parent: DocumentReference;
  fileId?: string;
  fileUrl?: string;
  fileName?: string;
  creationTime: string;
};

export type TProductForm = Pick<
  TProduct,
  "name" | "description" | "price" | "currency"
> &
  Partial<Pick<TProduct, "id">> &
  Partial<Pick<TProduct, "type">> & {
    image?: File;
  };
