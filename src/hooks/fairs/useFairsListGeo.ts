import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/immutable";

import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useToast } from "@/hooks/useToast";
import { getFairListGeolocationRequest } from "@/services";
import { TFairGeo } from "@/types/TFair";
import { ERoutesName } from "@/types/TRoutes";

export const useFairsListGeo = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWRMutation(
    "/fairs/geolocation",
    getFairListGeolocationRequest
  );

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

  useEffect(() => {
    if (error) toast(error, { type: "error" });
  }, [error]);

  return {
    list: data,
    isLoading,
    prepareListMapPin,
  };
};
