import { LatLngTuple } from "leaflet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIonLoading } from "@ionic/react";

import { saveFairRequest } from "@/services";
import { TFairForm } from "@/types/TFair";
import { useToast } from "@/hooks/useToast";
import { ERoutesName } from "@/types/TRoutes";

export const useNewFair = () => {
  const navigate = useNavigate();
  const [presentLoading, dismissLoading] = useIonLoading();

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

      const fair = await saveFairRequest(formValues);

      toast("Feria creada exitosamente", { type: "success" });

      navigate(`${ERoutesName.FAIRS_LIST}/${fair.id}`, {
        replace: true,
        state: {
          fairID: fair.id,
          fairName: fair.name,
          goBackUrl: ERoutesName.MY_SANBLE_FAIRS,
        },
      });
    } catch (error) {
      console.log({ error });
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  return {
    openMapModal,
    formValues,
    handleFormNext,
    handleSetLocation,
    handleSave,
    onOpenMapModal: setOpenMapModal,
  };
};
