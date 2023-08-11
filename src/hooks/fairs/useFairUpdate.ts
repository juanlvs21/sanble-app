import { useIonLoading } from "@ionic/react";
import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFairDetails } from "@/hooks/fairs/useFairDetails";
import { useToast } from "@/hooks/useToast";
import { updateFairRequest } from "@/services";
import { TFairForm } from "@/types/TFair";
import { ERoutesName } from "@/types/TRoutes";

export const useFairUpdate = (fairID: string) => {
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
    type: undefined,
    celebrationDate: "",
    contactEmail: "",
    contactPhone: "",
    geopoint: undefined,
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

      const fair = await updateFairRequest(formValues);

      toast("Feria actualizada exitosamente", { type: "success" });

      navigate(`${ERoutesName.FAIRS_LIST}/${fair.id}`, {
        replace: true,
        state: {
          fairID: fair.id,
          fairName: fair.name,
        },
      });
    } catch (error) {
      console.log({ error });
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (fair) {
      setFormValues({
        id: fair.id,
        name: fair.name,
        description: fair.description,
        address: fair.address,
        type: fair.type,
        celebrationDate: fair.celebrationDate,
        contactEmail: fair.contactEmail,
        contactPhone: fair.contactPhone,
        geopoint: fair.geopoint,
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
