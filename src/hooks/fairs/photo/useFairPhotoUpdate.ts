import { useIonLoading } from "@ionic/react";
import { useRef, useState } from "react";

import { useFairsRevalidate } from "@/hooks/fairs/useFairsRevalidate";
import { useToast } from "@/hooks/useToast";
import { updateFairPhotoRequest } from "@/services";
import { TPhotograph, TPhotographForm } from "@/types/TPhotograph";
import { mutate } from "swr";

export const useFairPhotoUpdate = (fairID: string) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const modalRef = useRef<HTMLIonModalElement>(null);
  const { toast } = useToast();
  const [isUpdate, setIsUpdate] = useState(false);
  const [photo, setPhoto] = useState<TPhotograph>();

  const { handleRevalidateLists } = useFairsRevalidate(fairID);

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

      const { photograph: photographRes } = await updateFairPhotoRequest(
        fairID,
        data.id,
        formData
      );

      if (photographRes.isCover) handleRevalidateLists();

      await mutate(`/fairs/${fairID}`, undefined, { revalidate: true });

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
