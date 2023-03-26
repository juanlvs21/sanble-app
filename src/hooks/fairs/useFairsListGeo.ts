import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/immutable";

import { formatFairsMarks } from "@/helpers/mapFormatMarkers";
import { useToast } from "@/hooks/useToast";
import { getFairListGeolocationRequest } from "@/services";
import { TFairGeo } from "@/types/TFair";
import { ERoutesName } from "@/types/TRoutes";

const SWR_KEY_FAIRS_GEO = "/fairs/geolocation";

export const useFairsListGeo = () => {
  const { toast, toastDismiss } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useSWRMutation(
    SWR_KEY_FAIRS_GEO,
    getFairListGeolocationRequest,
    {
      onError(error) {
        toastDismiss(SWR_KEY_FAIRS_GEO);
        toast(error, { type: "error", toastId: SWR_KEY_FAIRS_GEO });
      },
    }
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

  return {
    list: data,
    isLoading,
    prepareListMapPin,
  };
};
