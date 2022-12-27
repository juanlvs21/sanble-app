import { useState } from "react";

import { useToast } from "@/hooks/useToast";
import { getFairBestListRequest, getProductTypesRequest } from "@/services";
import { TFair } from "@/types/TFair";
import { TProductType } from "@/types/TProduct";

export const useHome = () => {
  const { toast } = useToast();

  const [fairsBest, setFairsBest] = useState<TFair[]>([]);
  const [standsBest, setStandsBest] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<TProductType[]>([]);
  const [isLoadingFairsBest, setIsLoadingFairsBest] = useState(true);
  const [isLoadingStandsBest, setIsLoadingStandsBest] = useState(true);
  const [isLoadingProductTypes, setIsLoadingProductTypes] = useState(true);

  const handleLoadFairsBest = async () => {
    setIsLoadingFairsBest(true);

    try {
      const data = await getFairBestListRequest();
      setFairsBest(data);
    } catch (error: any) {
      toast("Error al cargar las mejores ferias", {
        type: "error",
      });
    } finally {
      setIsLoadingFairsBest(false);
    }
  };

  const handleLoadStandsBest = async () => {
    setIsLoadingStandsBest(true);

    try {
      const data = await getFairBestListRequest();
      setStandsBest(data);
    } catch (error: any) {
      toast("Error al cargar los mejores stands", {
        type: "error",
      });
    } finally {
      setIsLoadingStandsBest(false);
    }
  };

  const handleLoadProductTypes = async () => {
    setIsLoadingProductTypes(true);

    try {
      const data = await getProductTypesRequest();
      setProductTypes(data);
    } catch (error: any) {
      toast("Error al cargar las categorias de productos", {
        type: "error",
      });
    } finally {
      setIsLoadingProductTypes(false);
    }
  };

  return {
    isLoadingFairsBest,
    isLoadingStandsBest,
    isLoadingProductTypes,
    fairsBest,
    standsBest,
    productTypes,
    handleLoadFairsBest,
    handleLoadStandsBest,
    handleLoadProductTypes,
  };
};
