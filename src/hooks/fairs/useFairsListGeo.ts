import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getFairListGeolocationRequest } from "@/services";
import { TFairGeo } from "@/types/TFair";
import { useToast } from "@/hooks/useToast";
import { formatFairsMarks } from "@/helpers/mapFormatMarkers";

export const useFairsListGeo = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [list, setList] = useState<TFairGeo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleLoad();
  }, []);

  const prepareListMapPin = (list: TFairGeo[]) =>
    formatFairsMarks(list || [], (id, name) =>
      navigate(`/app/ferias/${id}`, {
        state: {
          fairID: id,
          fairName: name,
        },
      })
    );

  const handleLoad = async () => {
    setIsLoading(true);

    try {
      const listRes = await getFairListGeolocationRequest();
      setList(listRes);
    } catch (error: any) {
      toast("Error al cargar el listado de ferias", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    list,
    isLoading,
    handleLoad,
    prepareListMapPin,
  };
};
