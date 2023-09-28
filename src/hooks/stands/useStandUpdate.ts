import { useIonLoading } from "@ionic/react";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";

import { useStandDetails } from "@/hooks/stands/useStandDetails";
import { useToast } from "@/hooks/useToast";
import { updateStandRequest } from "@/services";
import { ERoutesName } from "@/types/TRoutes";
import { TStandForm } from "@/types/TStand";

export const useStandUpdate = (standID: string) => {
  const { cache } = useSWRConfig();
  const navigate = useNavigate();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { stand, isLoadingDetails } = useStandDetails(standID ?? "");

  const { toast } = useToast();

  const [formValues, setFormValues] = useState<TStandForm>({
    id: "",
    name: "",
    description: "",
    slogan: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleSave = async (values: TStandForm) => {
    try {
      presentLoading();

      const stand = await updateStandRequest({
        ...values,
        contactPhone: (
          parsePhoneNumberFromString(values.contactPhone, "VE")
            ?.nationalNumber || values.contactPhone
        ).slice(0, 10),
      });

      cache.delete(`/stand/${standID}`);

      toast("Stand actualizado exitosamente", { type: "success" });

      navigate(`${ERoutesName.STANDS_LIST}/${stand.id}`, {
        replace: true,
        state: {
          standID: stand.id,
          standName: stand.name,
        },
      });
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (stand) {
      setFormValues({
        id: stand.id,
        name: stand.name,
        description: stand.description,
        slogan: stand.slogan ?? "",
        contactEmail: stand.contactEmail,
        contactPhone: stand.contactPhone,
      });
    }
  }, [stand]);

  return {
    isLoadingDetails,
    formValues,
    handleSave,
  };
};
