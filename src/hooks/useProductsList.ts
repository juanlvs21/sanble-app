import { useSWRLists } from "@/hooks/useSWRLists";
import { getProductsListRequest } from "@/services";
import { TProduct } from "@/types/TProduct";

export const useProductsList = () => {
  const listProps = useSWRLists<TProduct>("/products", getProductsListRequest, {
    orderBy: "name",
    orderDir: "asc",
  });

  return listProps;
};
