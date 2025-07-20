import { useIonLoading } from "@ionic/react";
import { LatLngTuple } from "leaflet";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";

import { useFairDetails } from "@/hooks/fairs/useFairDetails";
import { useToast } from "@/hooks/useToast";
import { updateFairRequest } from "@/services";
import { EFairType, TFairForm } from "@/types/TFair";
import { ERoutesName } from "@/types/TRoutes";

export const useFairUpdate = (fairID: string) => {
  const { cache } = useSWRConfig();
  const navigate = useNavigate();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { fair, isLoadingDetails } = useFairDetails(fairID ?? "");

  const { toast } = useToast();

  const [openMapModal, setOpenMapModal] = useState(false);
  const [formValues, setFormValues] = useState<TFairForm>({
    id: "",
    name: "",
    description: "",
    address: "",
    type: EFairType.ENTREPRENEURSHIP,
    contactEmail: "",
    contactPhone: "",
    geopoint: undefined,
    celebrationType: undefined,
    celebrationWeeklyDay: undefined,
    celebrationMonthlyDay: undefined,
    celebrationDate: undefined,
  });

  const handleFormNext = (values: TFairForm) => {
    setFormValues(values);
    setOpenMapModal(true);
  };

  const handleSetLocation = (latlng: LatLngTuple) => {
    setFormValues((values) => ({ ...values, geopoint: latlng }));
  };

  const handleSave = async () => {
    try {
      presentLoading();

      const fair = await updateFairRequest({
        ...formValues,
        contactPhone: (
          parsePhoneNumberFromString(formValues.contactPhone, "VE")
            ?.nationalNumber || formValues.contactPhone
        ).slice(0, 10),
      });

      cache.delete(`/fairs/${fairID}`);

      toast("Feria actualizada exitosamente", { type: "success" });

      navigate(`${ERoutesName.FAIRS_LIST}/${fair.id}`, {
        replace: true,
        state: {
          fairID: fair.id,
          fairName: fair.name,
        },
      });
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (fair) {
      console.log({ fair });
      setFormValues({
        id: fair.id,
        name: fair.name,
        description: fair.description,
        address: fair.address,
        type: fair.type,
        contactEmail: fair.contactEmail,
        contactPhone: fair.contactPhone,
        geopoint: fair.geopoint,
        celebrationType: fair.celebrationType,
        celebrationWeeklyDay: fair.celebrationWeeklyDay,
        celebrationMonthlyDay: fair.celebrationMonthlyDay,
        celebrationDate: fair.celebrationDate,
      });
    }
  }, [fair]);

  return {
    isLoadingDetails,
    openMapModal,
    formValues,
    handleFormNext,
    handleSetLocation,
    handleSave,
    onOpenMapModal: setOpenMapModal,
  };
};
