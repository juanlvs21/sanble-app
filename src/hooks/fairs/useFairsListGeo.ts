import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { getFairListGeolocationRequest } from "@/services";
import { TFairGeo } from "@/types/TFair";
import { useToast } from "@/hooks/useToast";
import { formatFairsMarks } from "@/helpers/mapFormatMarkers";

export const useFairsListGeo = () => {
  const { toast } = useToast();
  const history = useHistory();
  const [list, setList] = useState<TFairGeo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleLoad();
  }, []);

  const prepareListMapPin = (list: TFairGeo[], goBackUrl?: string) =>
    formatFairsMarks(list || [], (id, name) =>
      history.push(`/app/ferias/${id}`, {
        fairID: id,
        fairName: name,
        goBackUrl,
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
