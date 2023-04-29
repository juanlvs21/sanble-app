import { useNavigate } from "react-router-dom";
import { useIonLoading } from "@ionic/react";

import { saveFairRequest, saveStandRequest } from "@/services";
import { TStandForm } from "@/types/TStand";
import { useToast } from "@/hooks/useToast";
import { ERoutesName } from "@/types/TRoutes";

const formValues: TStandForm = {
  id: "",
  name: "",
  description: "",
  slogan: "",
  contactEmail: "",
  contactPhone: "",
};

export const useNewStand = () => {
  const navigate = useNavigate();
  const [presentLoading, dismissLoading] = useIonLoading();

  const { toast } = useToast();

  const handleSave = async (values: TStandForm) => {
    try {
      presentLoading();
      const stand = await saveStandRequest(values);

      toast("Stand creado exitosamente", { type: "success" });

      navigate(`${ERoutesName.STANDS_LIST}/${stand.id}`, {
        replace: true,
        state: {
          standID: stand.id,
          standName: stand.name,
          goBackUrl: ERoutesName.MY_SANBLE_STANDS,
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
    formValues,
    handleSave,
  };
};
