import { EProductTypeKey, TProductType } from "@/types/TProduct";

export const productTypes: TProductType[] = [
  {
    name: "Ropa",
    key: EProductTypeKey.CLOTHES,
  },
  {
    name: "Accesorios",
    key: EProductTypeKey.ACCESSORIES,
  },
  {
    name: "Bebidas",
    key: EProductTypeKey.DRINKS,
  },
  {
    name: "Dulces",
    key: EProductTypeKey.CANDIES,
  },
  {
    name: "Comidas",
    key: EProductTypeKey.FOODS,
  },
];

export const getProductTypeNameByKey = (key: EProductTypeKey) => {
  const productType = productTypes.find(
    (productType) => productType.key === key
  );
  return productType ? productType.name : "";
};
