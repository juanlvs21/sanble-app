import { useIonLoading } from "@ionic/react";

import { useStandsRevalidate } from "@/hooks/stands/useStandsRevalidate";
import { useToast } from "@/hooks/useToast";
import { deleteStandPhotoRequest } from "@/services";

export const useStandPhotoDelete = (standID: string) => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { toast } = useToast();
  const { handleRevalidateAll } = useStandsRevalidate(standID);

  const handleDeletePhoto = async (photoID: string, callback: () => void) => {
    presentLoading();

    try {
      await deleteStandPhotoRequest(standID, photoID);

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
