import { useIonLoading } from "@ionic/react";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/useToast";
import { saveStandRequest } from "@/services";
import { ERoutesName } from "@/types/TRoutes";
import { TStandForm } from "@/types/TStand";

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
      const stand = await saveStandRequest({
        ...values,
        contactPhone: (
          parsePhoneNumberFromString(values.contactPhone, "VE")
            ?.nationalNumber || values.contactPhone
        ).slice(0, 10),
      });

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
