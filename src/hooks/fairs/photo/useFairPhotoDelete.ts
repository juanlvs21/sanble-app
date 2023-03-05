import { useIonLoading } from "@ionic/react";

import { useFairPhotoRevalidate } from "@/hooks/fairs/useFairRevalidate";
import { useToast } from "@/hooks/useToast";
import { deleteFairPhotoRequest } from "@/services";

export const useFairPhotoDelete = (fairID: string) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();
  const { handleRevalidateAll } = useFairPhotoRevalidate(fairID);

  const handleDeletePhoto = async (photoID: string, callback: () => void) => {
    presentLoading();

    try {
      await deleteFairPhotoRequest(fairID, photoID);

      toast("Fotografía eliminada con éxito", {
        type: "success",
      });

      handleRevalidateAll();

      callback();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    } finally {
      dismissLoading();
    }
  };

  return {
    handleDeletePhoto,
  };
};
