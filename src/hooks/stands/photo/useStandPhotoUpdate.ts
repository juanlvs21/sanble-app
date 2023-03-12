import { useIonLoading } from "@ionic/react";
import { useRef, useState } from "react";

import { useStandsRevalidate } from "@/hooks/stands/useStandsRevalidate";
import { useToast } from "@/hooks/useToast";
import { updateStandPhotoRequest } from "@/services";
import { TPhotograph, TPhotographForm } from "@/types/TPhotograph";

export const useStandPhotoUpdate = (
  standID: string,
  callback?: (updateID?: string) => Promise<any>
) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const modalRef = useRef<HTMLIonModalElement>(null);
  const { toast } = useToast();
  const [isUpdate, setIsUpdate] = useState(false);
  const [photo, setPhoto] = useState<TPhotograph>();

  const { handleRevalidateDetails, handleRevalidateAll } =
    useStandsRevalidate(standID);

  const handleOpen = (photoCurrent: TPhotograph) => {
    setPhoto(photoCurrent);
    modalRef.current?.present();
  };

  const handleDismiss = () => modalRef.current?.dismiss();

  const handleUpdatePhoto = async (data: TPhotographForm) => {
    presentLoading();
    setIsUpdate(true);

    try {
      const formData = new FormData();

      formData.append("description", data.description);
      formData.append("isCover", `${data.isCover}`);

      const { photograph: photographRes } = await updateStandPhotoRequest(
        standID,
        data.id,
        formData
      );

      if (photographRes.isCover) handleRevalidateAll();
      else handleRevalidateDetails();

      if (callback) await callback(data.id);

      toast("Fotografía actualizada con éxito", {
        type: "success",
      });

      if (modalRef?.current) modalRef?.current?.dismiss();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      setIsUpdate(false);
      dismissLoading();
    }
  };

  return {
    modalRef,
    isUpdate,
    photo,
    handleOpen,
    handleDismiss,
    handleUpdatePhoto,
  };
};
