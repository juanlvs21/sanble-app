import { useEffect, useState } from "react";

import { useToast } from "@/hooks/useToast";
import { getFairDetailsRequest } from "@/services";
import { TFair } from "@/types/TFair";

export const useFairDetails = (fairID: string) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [fair, setFair] = useState<TFair>();

  useEffect(() => {
    if (fairID) handleLoad();
  }, []);

  const handleLoad = async () => {
    setIsLoading(true);

    try {
      const fairRes = await getFairDetailsRequest(fairID);
      setFair(fairRes);
    } catch (error: any) {
      toast("Error al cargar informacion de la feria", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fair,
    isLoading,
    handleLoad,
  };
};
