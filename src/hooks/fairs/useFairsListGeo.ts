import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useToast } from "@/hooks/useToast";
import { getFairListGeolocationRequest } from "@/services";
import { TFairGeo } from "@/types/TFair";
import { ERoutesName } from "@/types/TRoutes";

export const useFairsListGeo = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [list, setList] = useState<TFairGeo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleLoad();
  }, []);

  const prepareListMapPin = (list: TFairGeo[], goBackUrl?: string) =>
    formatFairsMarks(list || [], (id, name) =>
      navigate(`${ERoutesName.FAIRS_LIST}/${id}`, {
        state: {
          fairID: id,
          fairName: name,
          goBackUrl,
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
