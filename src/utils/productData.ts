import { EProductType, TProductType } from "@/types/TProduct";

export const productTypes: TProductType[] = [
  EProductType.CANDY,
  EProductType.FOOD,
  EProductType.DRINK,
  EProductType.CLOTHING,
  EProductType.ACCESSORY,
];

export const productIcon = {
  drink: "/assets/images/products/drink.png",
  clothing: "/assets/images/products/clothing.png",
  candy: "/assets/images/products/candy.png",
  food: "/assets/images/products/candy.png",
  accessory: "/assets/images/products/candy.png",
};

export const productText = {
  drink: "Bebidas",
  clothing: "Ropa",
  candy: "Dulces",
  food: "Comida",
  accessory: "Accesorios",
};
